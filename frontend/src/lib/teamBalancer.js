// Greedy team-balancing algorithm.
// 1. Sort players by rating (descending).
// 2. Assign each player to the team with the lowest total rating so far.
//    Break ties by (a) smaller team size, (b) team index.
// 3. Within each team, interleave skills by distributing players round-robin
//    per skill group so no team ends up all-bowlers / all-batsmen.

function assignByRating(players, numTeams) {
  const teams = Array.from({ length: numTeams }, () => ({ players: [], total: 0 }));
  const sorted = [...players].sort((a, b) => b.rating - a.rating);

  for (const p of sorted) {
    // choose team with min total; tiebreak on player count, then index
    let target = 0;
    for (let i = 1; i < teams.length; i++) {
      const a = teams[i];
      const b = teams[target];
      if (
        a.total < b.total ||
        (a.total === b.total && a.players.length < b.players.length)
      ) {
        target = i;
      }
    }
    teams[target].players.push(p);
    teams[target].total += p.rating;
  }
  return teams;
}

// Pairwise swap refinement: iteratively swap one player from the highest-total
// team with one from the lowest-total team if doing so strictly reduces the
// (max-min) spread. Keeps player counts per team unchanged.
function refineBySwap(teams, maxIters = 400) {
  for (let iter = 0; iter < maxIters; iter++) {
    const totals = teams.map((t) => t.total);
    const maxI = totals.indexOf(Math.max(...totals));
    const minI = totals.indexOf(Math.min(...totals));
    if (maxI === minI) return;
    const spread = totals[maxI] - totals[minI];
    if (spread === 0) return;

    let best = null; // {ai, bi, newSpread}
    const A = teams[maxI].players;
    const B = teams[minI].players;
    for (let ai = 0; ai < A.length; ai++) {
      for (let bi = 0; bi < B.length; bi++) {
        const delta = A[ai].rating - B[bi].rating;
        if (delta <= 0) continue; // swap only helps if A gives up a higher rating
        const newA = totals[maxI] - delta;
        const newB = totals[minI] + delta;
        // Must not make B exceed A (otherwise we just flip the problem)
        if (newA < newB) continue;
        const newSpread = newA - newB;
        if (newSpread < spread && (!best || newSpread < best.newSpread)) {
          best = { ai, bi, newSpread, newA, newB };
        }
      }
    }
    if (!best) return;

    // Perform the swap.
    const pa = A[best.ai];
    const pb = B[best.bi];
    A[best.ai] = pb;
    B[best.bi] = pa;
    teams[maxI].total = best.newA;
    teams[minI].total = best.newB;
  }
}

export function generateTeams(players, numTeams) {
  const n = Math.max(2, Math.min(4, Number(numTeams) || 2));
  if (players.length === 0) return [];

  // First balance by rating.
  const teams = assignByRating(players, n);
  // Then refine via pairwise swaps to minimise (max-min) spread.
  refineBySwap(teams);

  // Compute balance metric (for UI feedback).
  const totals = teams.map((t) => t.total);
  const max = Math.max(...totals);
  const min = Math.min(...totals);
  const avg = totals.reduce((a, b) => a + b, 0) / totals.length || 1;
  const diffPct = ((max - min) / avg) * 100;

  // Names like Team Alpha, Team Bravo ...
  const names = ["Team Alpha", "Team Bravo", "Team Charlie", "Team Delta"];

  return teams.map((t, i) => ({
    id: `t${i + 1}`,
    name: names[i] ?? `Team ${i + 1}`,
    players: t.players,
    total: t.total,
    avg: t.players.length ? +(t.total / t.players.length).toFixed(1) : 0,
    balanceDiffPct: +diffPct.toFixed(2),
  }));
}
