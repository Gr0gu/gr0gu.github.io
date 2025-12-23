export default function solve(password) {
    // --- 1. Constants & Helpers ---
    const MIN_LEN = 6;
    const MAX_LEN = 20;

    const isLower = c => c >= 97 && c <= 122;
    const isUpper = c => c >= 65 && c <= 90;
    const isDigit = c => c >= 48 && c <= 57;

    const getTypeMask = (c) => {
        if (isLower(c)) return 1; // 001
        if (isUpper(c)) return 2; // 010
        if (isDigit(c)) return 4; // 100
        return 0;
    };

    const isEcho = (prev, curr) => prev === curr;
    const isSequence = (prev, curr) => {
        return curr === prev + 1;
    };

    // --- 2. Priority Queue (Min-Heap) Implementation ---
    class MinHeap {
        constructor() { this.data = []; }
        push(val) {
            this.data.push(val);
            this.bubbleUp(this.data.length - 1);
        }
        pop() {
            if (this.data.length === 0) return null;
            const res = this.data[0];
            const last = this.data.pop();
            if (this.data.length > 0) {
                this.data[0] = last;
                this.bubbleDown(0);
            }
            return res;
        }
        bubbleUp(i) {
            while (i > 0) {
                const p = Math.floor((i - 1) / 2);
                if (this.data[p].cost <= this.data[i].cost) break;
                [this.data[p], this.data[i]] = [this.data[i], this.data[p]];
                i = p;
            }
        }
        bubbleDown(i) {
            while (true) {
                let left = 2 * i + 1, right = 2 * i + 2, min = i;
                if (left < this.data.length && this.data[left].cost < this.data[min].cost) min = left;
                if (right < this.data.length && this.data[right].cost < this.data[min].cost) min = right;
                if (min === i) break;
                [this.data[min], this.data[i]] = [this.data[i], this.data[min]];
                i = min;
            }
        }
    }

    // --- 3. The Algorithm (Dijkstra) ---

    // State encoding: (idx << 20) | (len << 15) | (lastChar << 8) | mask
    // We use a Flat Int32Array for visited checks if size permits, 
    // or a Map. Given constraints, Map is safer and simpler.
    const minCosts = new Map();
    const pq = new MinHeap();

    // Initial State: cost=0, idx=0, len=0, lastChar=0 (null), mask=0
    pq.push({ cost: 0, idx: 0, len: 0, last: 0, mask: 0 });

    while (pq.data.length > 0) {
        const { cost, idx, len, last, mask } = pq.pop();

        // Check bounds
        if (len > MAX_LEN) continue;

        // Optimization: Visited check
        // Key: idx, len, last, mask
        const key = `${idx},${len},${last},${mask}`;
        if (minCosts.has(key) && minCosts.get(key) <= cost) continue;
        minCosts.set(key, cost);

        // --- SUCCESS CONDITION ---
        // If we processed the whole input AND satisfy rules
        if (idx === password.length && len >= MIN_LEN && len <= MAX_LEN && mask === 7) {
            return cost;
        }

        const inputChar = idx < password.length ? password.charCodeAt(idx) : null;

        // --- TRANSITIONS ---

        // 1. DELETE (Cost 3)
        // Skip current input char
        if (idx < password.length) {
            pq.push({ cost: cost + 3, idx: idx + 1, len: len, last: last, mask: mask });
        }

        // Candidates for Insert/Replace
        // To optimize, we don't try all characters. We try:
        // - A generic Lower, Upper, Digit (to fix mask)
        // - Specifically the inputChar (if valid) to mimic a "Keep"
        // - Specifically inputChar +/- 1 to avoid sequences
        const candidates = new Set();
        candidates.add(97); // 'a'
        candidates.add(65); // 'A'
        candidates.add(48); // '0'

        // If last char exists, try chars that don't conflict
        if (last !== 0) {
            if (isLower(last)) candidates.add(98); // 'b'
            if (isUpper(last)) candidates.add(66); // 'B'
            if (isDigit(last)) candidates.add(49); // '1'
        }

        // Also consider current and next char interactions
        if (inputChar !== null) candidates.add(inputChar);

        // Convert Set to Array for iteration
        const candidateList = Array.from(candidates);

        // 2. INSERT (Cost 2)
        if (len < MAX_LEN) {
            for (let cand of candidateList) {
                // Try finding a valid char of this TYPE (Lower/Upper/Digit)
                // We basically assume if we need a type, we can find a char that fits
                // that isn't an echo/sequence.
                // Simplification: Just loop specific representatives + check constraints.

                // Let's allow "cheating" slightly: Instead of checking specific 'a',
                // we iterate TYPES. 
                // However, Echo/Seq is specific.
                // Let's stick to the list but expand it slightly to be safe.
                const trials = [cand, cand + 1, cand + 2];

                for (let c of trials) {
                    if (!isLower(c) && !isUpper(c) && !isDigit(c)) continue;

                    if (last !== 0) {
                        if (isEcho(last, c)) continue;
                        if (isSequence(last, c)) continue;
                    }

                    const newMask = mask | getTypeMask(c);
                    pq.push({
                        cost: cost + 2,
                        idx: idx, // Insert doesn't consume input
                        len: len + 1,
                        last: c,
                        mask: newMask
                    });
                }
            }
        }

        // 3. REPLACE (Cost 1)
        if (idx < password.length && len < MAX_LEN) {
            // Similar logic to Insert, but consumes index
            // We reuse the 'trials' logic implicitly by just running similar loop
            // But we can just use our candidate list logic again.

            // To ensure correctness, iterate safe chars for each required type
            const safeChars = [97, 98, 99, 65, 66, 67, 48, 49, 50];

            for (let c of safeChars) {
                if (last !== 0) {
                    if (isEcho(last, c)) continue;
                    if (isSequence(last, c)) continue;
                }
                pq.push({
                    cost: cost + 1,
                    idx: idx + 1,
                    len: len + 1,
                    last: c,
                    mask: mask | getTypeMask(c)
                });
            }
        }

        // 4. KEEP (Cost 0)
        if (idx < password.length && len < MAX_LEN) {
            const c = inputChar;
            let valid = true;
            if (last !== 0) {
                if (isEcho(last, c)) valid = false;
                if (isSequence(last, c)) valid = false;
            }

            if (valid) {
                pq.push({
                    cost: cost,
                    idx: idx + 1,
                    len: len + 1,
                    last: c,
                    mask: mask | getTypeMask(c)
                });
            }
        }
    }

    return -1; // Should not reach here
}