
/// Lab 1 ///
document.addEventListener('DOMContentLoaded', async () => {
    /* 1.1 */
    const numberOfTosses = await import('./1/how_much_bet.js');
    const betRoot = document.getElementById('bet-root');
    const betButton = betRoot.querySelector('.calculate');

    betButton.addEventListener('click', () => {
        const input = Number(betRoot.querySelector('.input').value);
        const price = Number(betRoot.querySelector('.price').value);
        const output = betRoot.querySelector('.output');

        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');
        const header = document.createElement('tr');

        header.innerHTML = '<th>Trial</th><th>Coin tosses</th><th>Amount Won</th>';
        thead.append(header);
        table.append(thead, tbody);

        let totalResult = 0, totalAmount = 0;
        let maximumResult = 0, maximumAmount = 0;
        for (let i = 0; i < input; i++) {
            const result = numberOfTosses.default();
            const amount = 2 ** result;
            const row = document.createElement('tr');

            row.innerHTML = `<td>${i + 1}.</td><td>${result}</td><td>${amount}$</td>`;
            tbody.append(row);

            totalResult += result;
            totalAmount += amount;
            maximumResult = Math.max(maximumResult, result);
            maximumAmount = Math.max(maximumAmount, amount);
        }

        const averageResult = totalResult / input;
        const averageAmount = totalAmount / input;
        const totalExpenses = input * price;
        const pureProfit = totalAmount - totalExpenses;

        const totalRow = document.createElement('tr');
        totalRow.className = 'total';
        totalRow.innerHTML = `<td>Total:</td><td>${totalResult}</td><td>${totalAmount}$</td>`;
        tbody.append(totalRow);

        const averageRow = document.createElement('tr');
        averageRow.className = 'average';
        averageRow.innerHTML = `<td>Average:</td><td>${averageResult}</td><td>${averageAmount}$</td>`;
        tbody.append(averageRow);

        const maximumRow = document.createElement('tr');
        maximumRow.className = 'maximum';
        maximumRow.innerHTML = `<td>Maximum:</td><td>${maximumResult}</td><td>${maximumAmount}$</td>`;
        tbody.append(maximumRow);

        const expensesRow = document.createElement('tr');
        expensesRow.className = 'expenses';
        expensesRow.innerHTML = `<td>Expenses:</td><td>${input} × ${price}$</td><td>${totalExpenses}$</td>`;
        tbody.append(expensesRow);

        const pureProfitRow = document.createElement('tr');
        pureProfitRow.className = 'profit';
        pureProfitRow.innerHTML = `<td>Pure Profit:</td><td></td><td>${pureProfit}$</td>`;
        tbody.append(pureProfitRow);

        output.replaceChildren(table);
    });

    /* 1.2 */
    const probabilityToSurvive = await import('./1/life_bet.js');
    const lifeRoot = document.getElementById('life-bet');
    const lifeButton = lifeRoot.querySelector('.calculate');

    lifeButton.addEventListener('click', () => {
        const output = lifeRoot.querySelector('.output');

        const cases = [
            { slots: 6, adjacent: true, spin: true, label: 'Adjacent bullets, spin barrel' },
            { slots: 6, adjacent: true, spin: false, label: 'Adjacent bullets, do not spin' },
            { slots: 6, adjacent: false, spin: true, label: 'Non-adjacent bullets, spin barrel' },
            { slots: 6, adjacent: false, spin: false, label: 'Non-adjacent bullets, do not spin' },
            { slots: 5, adjacent: true, spin: true, label: '5 slots, adjacent bullets, spin barrel' },
            { slots: 5, adjacent: true, spin: false, label: '5 slots, adjacent bullets, do not spin' },
            { slots: 5, adjacent: false, spin: true, label: '5 slots, non-adjacent bullets, spin barrel' },
            { slots: 5, adjacent: false, spin: false, label: '5 slots, non-adjacent bullets, do not spin' }
        ];

        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');
        const header = document.createElement('tr');

        header.innerHTML = '<th>Case</th><th>Slots</th><th>Arrangement</th><th>Second pull</th><th>Probability</th>';
        thead.append(header);
        table.append(thead, tbody);

        cases.forEach((currentCase, index) => {
            const row = document.createElement('tr');
            const probability = probabilityToSurvive.default(
                currentCase.slots,
                currentCase.adjacent,
                currentCase.spin
            );

            row.innerHTML = `
                <td>${index + 1}.</td>
                <td>${currentCase.slots}</td>
                <td>${currentCase.adjacent ? 'Adjacent' : 'Non-adjacent'}</td>
                <td>${currentCase.spin ? 'Spin' : 'Do not spin'}</td>
                <td>${probability}%</td>
            `;
            tbody.append(row);
        });

        output.replaceChildren(table);
    });

    /* 1.3 */
    const labouchere = await import('./1/labouchere.js');
    const labouchereRoot = document.getElementById('labouchere-root');
    const labouchereButton = labouchereRoot.querySelector('.calculate');

    labouchereButton.addEventListener('click', () => {
        const bankroll = Number(labouchereRoot.querySelector('.bankroll').value);
        const tableLimit = Number(labouchereRoot.querySelector('.limit').value);
        const output = labouchereRoot.querySelector('.output');
        const result = labouchere.default(bankroll, tableLimit);

        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');
        const header = document.createElement('tr');

        header.innerHTML = '<th>Metric</th><th>Value</th>';
        thead.append(header);
        table.append(thead, tbody);

        const rows = [
            ['Result', result.result],
            ['Starting bankroll', `${bankroll}$`],
            ['Table limit', `${tableLimit}$`],
            ['Final balance', `${result.balance}$`],
            ['Max bet placed', `${result.maxBet}$`],
            ['Rounds played', result.rounds]
        ];

        rows.forEach(([label, value]) => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${label}</td><td>${value}</td>`;
            tbody.append(row);
        });

        output.replaceChildren(table);
    });

    /* 1.4 */
    const oscarsRoot = document.getElementById('oscars-grind-root');
    const oscarsGrind = await import('./1/oscar_grind.js');

    const oscarsButton = oscarsRoot.querySelector('.calculate');

    oscarsButton.addEventListener('click', () => {
        const bankroll = Number(oscarsRoot.querySelector('.bankroll').value);
        const tableLimit = Number(oscarsRoot.querySelector('.limit').value);
        const output = oscarsRoot.querySelector('.output');

        const result = oscarsGrind.default(bankroll, tableLimit);

        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');
        const header = document.createElement('tr');

        header.innerHTML = '<th>Metric</th><th>Value</th>';
        thead.append(header);
        table.append(thead, tbody);

        const rows = [
            ['Result', result.result],
            ['Starting bankroll', `${bankroll}$`],
            ['Table limit', `${tableLimit}$`],
            ['Final balance', `${result.balance}$`],
            ['Max bet placed', `${result.maxBetPlaced}$`],
            ['Lowest balance', `${result.lowestDip}$`],
        ];

        rows.forEach(([label, value]) => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${label}</td><td>${value}</td>`;
            tbody.append(row);
        });

        output.replaceChildren(table);
    });

    /* 1.5 */
    const birthdayRoot = document.getElementById('birthday-root');
    const birthdayButton = birthdayRoot.querySelector('button');

    birthdayButton.addEventListener('click', async () => {
        const output = birthdayRoot.querySelector('.output');
        birthdayButton.disabled = true;
        output.innerHTML = '<p>Searching for collision...</p>';

        const worker = new Worker('./1/birthday_attack.js', { type: 'module' });

        worker.addEventListener('message', (event) => {
            const collision = event.data;

            output.innerHTML = `
            <div style="background: #f4f4f5; padding: 15px; border-radius: 6px; margin-top: 15px; border: 1px solid #ddd;">
                <h4 style="margin-top: 0; color: #16a34a;">Collision Found!</h4>
                <p><strong>String 1:</strong> <code>${collision.string1}</code></p>
                <p><strong>String 2:</strong> <code>${collision.string2}</code></p>
                <p><strong>Matching Hash (40-bit):</strong> <code">${collision.hash}</code></p>
            </div>
        `;

            birthdayButton.disabled = false;
            worker.terminate();
        });

        worker.addEventListener('error', () => {
            output.innerHTML = `<p style="color: red;">Error in background thread.</p>`;
            birthdayButton.disabled = false;
            worker.terminate();
        })
    });

    /* 2.1 */
    const diceRoot = document.getElementById('dice-observation-root');
    let diceChartInstance = null;

    if (diceRoot) {
        const diceButton = diceRoot.querySelector('.calculate');
        const output = diceRoot.querySelector('.output');
        const canvasContainer = diceRoot.querySelector('.canvas-container');
        const canvas = document.getElementById('dice-chart');

        diceButton.addEventListener('click', async () => {
            const { default: simulateDiceRolls } = await import('./2/dice_observation.js');
            const { default: Chart } = await import('https://cdn.jsdelivr.net/npm/chart.js/auto/+esm');

            const trials = Number(document.getElementById('dice-trials').value);

            const counts = simulateDiceRolls(trials);

            const labels = Array.from({ length: 16 }, (_, i) => i + 3);
            const probabilities = labels.map(sum => (counts[sum] / trials) * 100);

            if (canvasContainer) {
                canvasContainer.style.display = 'block';
            }

            if (diceChartInstance) {
                diceChartInstance.destroy();
            }

            const backgroundColors = labels.map(sum => sum === 9 ? 'rgba(234, 88, 12, 0.75)' : sum === 10 ? 'rgba(37, 99, 235, 0.75)' : 'rgba(156, 163, 175, 0.3)');
            const borderColors = labels.map(sum => sum === 9 ? 'rgba(234, 88, 12, 1)' : sum === 10 ? 'rgba(37, 99, 235, 1)' : 'rgba(156, 163, 175, 0.6)');

            diceChartInstance = new Chart(canvas.getContext('2d'), {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Observed Frequency (%)',
                        data: probabilities,
                        backgroundColor: backgroundColors,
                        borderColor: borderColors,
                        borderWidth: 1.5,
                        borderRadius: 4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: { display: true, text: 'Probability (%)' }
                        },
                        x: {
                            title: { display: true, text: 'Sum of Three Dice' }
                        }
                    }
                }
            });

            const p9 = ((counts[9] / trials) * 100).toFixed(3);
            const p10 = ((counts[10] / trials) * 100).toFixed(3);

            output.innerHTML = `
                <div style="margin-top: 20px; padding: 15px; background: #fafafa; border: 1px solid #e4e4e7; border-radius: 6px; font-size: 0.95rem; line-height: 1.5;">
                    <p>probability for <strong>Sum 9: ${p9}%</strong></p>
                    <p>probability for <strong>Sum 10: ${p10}%</strong></p>
                    <p><i>Sum 10 consistently occurs slightly more often than Sum 9, despite both targets having exactly 6 partition footprints.</i></p>
                </div>
            `;
        });
    }

    /* 2.2 National Election */
    const electionRoot = document.getElementById('national-election-root');

    if (electionRoot) {
        const electionButton = electionRoot.querySelector('.calculate');
        const output = electionRoot.querySelector('.output');

        electionButton.addEventListener('click', async () => {
            const { default: simulateElection } = await import('./2/national_election.js');

            const splitVal = document.getElementById('election-split').value;
            const sampleSize = Number(document.getElementById('election-sample').value) || 1000;
            const simulations = Number(document.getElementById('election-simulations').value) || 100;

            const demProbability = splitVal === '48-52' ? 0.52 : 0.51;

            const correctCount = simulateElection(sampleSize, demProbability, simulations);
            const accuracy = ((correctCount / simulations) * 100).toFixed(1);

            output.innerHTML = `
                <div style="margin-top: 15px; padding: 12px; border: 1px solid #e4e4e7; border-radius: 6px; font-family: monospace;">
                    <div>True Distribution: ${(100 - demProbability * 100)}% Rep / ${(demProbability * 100)}% Dem</div>
                    <div>Sample Size (N):    ${sampleSize}</div>
                    <div>Total Runs:         ${simulations}</div>
                    <div style="margin-top: 8px; font-weight: bold; color: #16a34a;">
                        Correct Predictions: ${correctCount} / ${simulations} (${accuracy}%)
                    </div>
                </div>
            `;
        });
    }

    /* 2.3 Densities (Stick Breaking) */
    const stickRoot = document.getElementById('stick-breaking-root');

    if (stickRoot) {
        const stickButton = stickRoot.querySelector('.calculate');
        const output = stickRoot.querySelector('.output');

        stickButton.addEventListener('click', async () => {
            const { default: simulateStickBreaking } = await import('./2/stick_breaking.js');
            const trials = Number(document.getElementById('stick-trials').value) || 100000;

            const probability = simulateStickBreaking(trials);

            output.innerHTML = `
                <div style="margin-top: 15px; padding: 12px; border: 1px solid #e4e4e7; border-radius: 6px; font-family: monospace;">
                    <div>Total Trials:    ${trials.toLocaleString()}</div>
                    <div style="margin-top: 8px; font-weight: bold; color: #2563eb;">
                        Simulated Probability: ${(probability * 100).toFixed(3)}%
                    </div>
                    <div style="margin-top: 8px; color: #6b7280;">
                        Theoretical Value:     ~38.63% (ln(2) - 0.5)
                    </div>
                </div>
            `;
        });
    }

    /* 2.4 Densities (Circle Quadrilateral) */
    const quadRoot = document.getElementById('quadrilateral-circle-root');

    if (quadRoot) {
        const quadButton = quadRoot.querySelector('.calculate');
        const output = quadRoot.querySelector('.output');

        quadButton.addEventListener('click', async () => {
            const { default: simulateCircleQuadrilateral } = await import('./2/circle_quadrilateral.js');
            const trials = Number(document.getElementById('quad-trials').value) || 100000;

            const probability = simulateCircleQuadrilateral(trials);

            output.innerHTML = `
                <div style="margin-top: 15px; padding: 12px; border: 1px solid #e4e4e7; border-radius: 6px; font-family: monospace;">
                    <div>Total Trials:    ${trials.toLocaleString()}</div>
                    <div style="margin-top: 8px; font-weight: bold; color: #2563eb;">
                        Simulated Probability: ${(probability * 100).toFixed(3)}%
                    </div>
                </div>
            `;
        });
    }

    /* 2.5 Family cases */
    const familyRoot = document.getElementById('family-cases-root');

    if (familyRoot) {
        const familyButton = familyRoot.querySelector('.calculate');
        const output = familyRoot.querySelector('.output');

        familyButton.addEventListener('click', async () => {
            const { default: simulateFamilyCases } = await import('./2/family_cases.js');
            const numFamilies = Number(document.getElementById('family-count').value) || 100000;

            const res = simulateFamilyCases(numFamilies);

            output.innerHTML = `
                <div style="margin-top: 15px; padding: 12px; border: 1px solid #e4e4e7; border-radius: 6px; font-family: monospace;">
                    <div>Families Simulated:        ${numFamilies.toLocaleString()}</div>
                    <div>Avg Children (Scheme 1):   ${res.avgS1.toFixed(3)} (Expected: 2.0)</div>
                    <div>Avg Children (Scheme 2):   ${res.avgS2.toFixed(3)} (Expected: 3.0)</div>
                    <div style="margin-top: 8px; font-weight: bold; color: #ea580c;">
                        Extra Children per 100k:    ${Math.round(res.differenceInExpected).toLocaleString()} (Expected: 100,000)
                    </div>
                </div>
            `;
        });
    }

    /* 2.6 Densities (Coin Toss Checkerboard) */
    const boardRoot = document.getElementById('coin-toss-checkerboard-root');

    if (boardRoot) {
        const boardButton = boardRoot.querySelector('.calculate');
        const output = boardRoot.querySelector('.output');

        boardButton.addEventListener('click', async () => {
            const { default: simulateCheckerboard } = await import('./2/coin_toss_checkerboard.js');
            const trials = Number(document.getElementById('board-trials').value) || 100000;

            const res = simulateCheckerboard(trials);

            output.innerHTML = `
                <div style="margin-top: 15px; padding: 12px; border: 1px solid #e4e4e7; border-radius: 6px; font-family: monospace;">
                    <div>Total Tosses:         ${trials.toLocaleString()}</div>
                    <div>Win Probability:      ${(res.winProbability * 100).toFixed(2)}% (Theoretical: 25.00%)</div>
                    <div>Expected Return/Leu:  ${res.expectedReturnReturnPerLeu ? res.expectedReturnReturnPerLeu.toFixed(2) : (res.winProbability * 4).toFixed(2)} Lei</div>
                    <div style="margin-top: 8px; font-weight: bold; color: #dc2626;">
                        Game Status:           ${(res.winProbability * 4) === 1.0 ? 'Fair' : 'Unfair (House Edge: 0%)'}
                    </div>
                </div>
            `;
        });
    }

    /* 2.7 Densities (Heads Histogram) */
    const histogramRoot = document.getElementById('heads-histogram-root');
    let histogramChartInstance = null;

    if (histogramRoot) {
        const histButton = histogramRoot.querySelector('.calculate');
        const output = histogramRoot.querySelector('.output');
        const canvasContainer = histogramRoot.querySelector('.canvas-container');
        const canvas = document.getElementById('heads-chart');

        histButton.addEventListener('click', async () => {
            const { default: simulateHeadsHistogram } = await import('./2/heads_histogram.js');
            const { default: Chart } = await import('https://cdn.jsdelivr.net/npm/chart.js/auto/+esm');

            const tosses = Number(document.getElementById('hist-tosses').value) || 1000;
            const repeats = Number(document.getElementById('hist-repeats').value) || 100;

            const frequencies = simulateHeadsHistogram(tosses, repeats);

            // Filter intervals between [35, 65] relative to 100 tosses default context scale
            // To make it dynamic, we can view the range around the median ±15%
            const median = Math.floor(tosses / 2);
            const minBound = Math.max(0, median - Math.floor(tosses * 0.15));
            const maxBound = Math.min(tosses, median + Math.floor(tosses * 0.15));

            const labels = [];
            const datasetData = [];

            for (let n = minBound; n <= maxBound; n++) {
                labels.push(n);
                datasetData.push(frequencies[n] / repeats);
            }

            if (canvasContainer) canvasContainer.style.display = 'block';
            if (histogramChartInstance) histogramChartInstance.destroy();

            histogramChartInstance = new Chart(canvas.getContext('2d'), {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Proportion',
                        data: datasetData,
                        backgroundColor: '#3b82f6',
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                        y: { title: { display: true, text: 'Proportion' } },
                        x: { title: { display: true, text: 'Number of Heads (n)' } }
                    }
                }
            });

            output.innerHTML = `
                <div style="margin-top: 15px; padding: 12px; border: 1px solid #e4e4e7; border-radius: 6px; font-family: monospace;">
                    <div>Tosses per Experiment: ${tosses}</div>
                    <div>Total Repeats:        ${repeats.toLocaleString()}</div>
                    <div style="margin-top: 8px; color: #6b7280;">
                        Note: The distribution follows a binomial shape ($p=0.5$). According to the Central Limit Theorem, as the number of experiments grows, it converges tightly to a smooth Normal Bell Curve.
                    </div>
                </div>
            `;
        });
    }

    /* 2.8 Densities (Circular Table Neighbors) */
    const tableRoot = document.getElementById('circular-table-root');

    if (tableRoot) {
        const tableButton = tableRoot.querySelector('.calculate');
        const output = tableRoot.querySelector('.output');

        tableButton.addEventListener('click', async () => {
            const { default: simulateSeating } = await import('./2/circular_table.js');

            const n = Number(document.getElementById('table-participants').value) || 10;
            const trials = Number(document.getElementById('table-trials').value) || 10000;

            const probability = simulateSeating(n, trials);

            output.innerHTML = `
                <div style="margin-top: 15px; padding: 12px; border: 1px solid #e4e4e7; border-radius: 6px; font-family: monospace;">
                    <div>Participants (n):    ${n}</div>
                    <div>Total Trials:         ${trials.toLocaleString()}</div>
                    <div style="margin-top: 8px; font-weight: bold; color: #2563eb;">
                        Simulated Probability: ${(probability * 100).toFixed(3)}%
                    </div>
                </div>
            `;
        });
    }

    /* 3.1 Interesting sequence occurrences */
    const queueRoot = document.getElementById('customer-queue-root');

    if (queueRoot) {
        const queueButton = queueRoot.querySelector('.calculate');
        const output = queueRoot.querySelector('.output');

        queueButton.addEventListener('click', async () => {
            const { default: simulateCustomerQueue } = await import('./3/customer_queue.js');
            const trials = Number(document.getElementById('queue-trials').value) || 50000;

            const res = simulateCustomerQueue(trials);

            output.innerHTML = `
                <div style="margin-top: 15px; padding: 12px; border: 1px solid #e4e4e7; border-radius: 6px; font-family: monospace;">
                    <div>Simulations Run:     ${trials.toLocaleString()}</div>
                    <div>Avg Wait (Hours):    ${res.averageWaitHours.toFixed(4)} hours</div>
                    <div style="margin-top: 8px; font-weight: bold; color: #2563eb;">
                        Avg Wait (Minutes):  ${res.averageWaitMinutes.toFixed(2)} minutes
                    </div>
                    <div style="margin-top: 8px; color: #6b7280;">
                        Theoretical Value:   10.00 minutes (Memoryless Property)
                    </div>
                </div>
            `;
        });
    }

    /* 3.2 Continuous Conditional probability */
    const dartRoot = document.getElementById('dart-prob-root');

    if (dartRoot) {
        const dartButton = dartRoot.querySelector('.calculate');
        const output = dartRoot.querySelector('.output');

        dartButton.addEventListener('click', async () => {
            const { default: simulateDartThrows } = await import('./3/dart_prob.js');
            const trials = Number(document.getElementById('dart-trials').value) || 100000;

            const res = simulateDartThrows(trials);

            output.innerHTML = `
                <div style="margin-top: 15px; padding: 12px; border: 1px solid #e4e4e7; border-radius: 6px; font-family: monospace;">
                    <div>Valid Upper Half Throws: ${trials.toLocaleString()}</div>
                    <div style="margin-top: 6px;">1. Right Half:         ${(res.probRightHalf * 100).toFixed(2)}% (Theoretical: 50.00%)</div>
                    <div>2. Distance < 5:       ${(res.probLessThan5 * 100).toFixed(2)}% (Theoretical: 25.00%)</div>
                    <div>3. Distance > 5:       ${(res.probGreaterThan5 * 100).toFixed(2)}% (Theoretical: 75.00%)</div>
                    <div>4. Within 5" of (0,5): ${(res.probNearPoint * 100).toFixed(2)}% (Theoretical: 50.00%)</div>
                </div>
            `;
        });
    }

    /* 3.3 Counting (Lost Ticket Theater) */
    const theaterRoot = document.getElementById('theater-seats-root');

    if (theaterRoot) {
        const theaterButton = theaterRoot.querySelector('.calculate');
        const output = theaterRoot.querySelector('.output');

        theaterButton.addEventListener('click', async () => {
            const { default: simulateTheaterSeats } = await import('./3/theater_seats.js');
            const trials = Number(document.getElementById('theater-trials').value) || 10000;

            const probability = simulateTheaterSeats(100, trials);

            output.innerHTML = `
                <div style="margin-top: 15px; padding: 12px; border: 1px solid #e4e4e7; border-radius: 6px; font-family: monospace;">
                    <div>Simulations Run:     ${trials.toLocaleString()}</div>
                    <div style="margin-top: 8px; font-weight: bold; color: #2563eb;">
                        Simulated Probability: ${(probability * 100).toFixed(2)}%
                    </div>
                    <div style="margin-top: 8px; color: #6b7280;">
                        Theoretical Value:     50.00%
                    </div>
                </div>
            `;
        });
    }

    /* 3.4.1 Word Frequency Parsing */
    const parserRoot = document.getElementById('tweet-parser-root');

    if (parserRoot) {
        const parseButton = parserRoot.querySelector('.calculate');
        const output = parserRoot.querySelector('.output');

        parseButton.addEventListener('click', async () => {
            const { default: parseTweetFrequency } = await import('./3/tweet_parser.js');

            output.innerHTML = '<div>Processing dataset arrays...</div>';
            const sortedWords = await parseTweetFrequency();

            // Format top 10 tokens for preview metrics
            let rowsHtml = '';
            sortedWords.slice(0, 10).forEach(([word, count]) => {
                rowsHtml += `<div>• ${word}: ${count.toLocaleString()} times</div>`;
            });

            output.innerHTML = `
                <div style="margin-top: 15px; padding: 12px; border: 1px solid #e4e4e7; border-radius: 6px; font-family: monospace;">
                    <div>Unique Tokens Extracted: ${sortedWords.length.toLocaleString()}</div>
                    <div style="margin-top: 8px; font-weight: bold; color: #2563eb;">Top 10 Most Frequent Words:</div>
                    <div style="margin-top: 4px; padding-left: 8px; line-height: 1.4;">
                        ${rowsHtml}
                    </div>
                </div>
            `;
        });
    }

    /* 3.4.2 Nouns Frequency Parsing */
    const nounsRoot = document.getElementById('tweet-nouns-root');

    if (nounsRoot) {
        const nounsButton = nounsRoot.querySelector('.calculate');
        const output = nounsRoot.querySelector('.output');

        nounsButton.addEventListener('click', async () => {
            const { default: parseTweetNouns } = await import('./3/tweet_nouns.js');

            output.innerHTML = '<div>Running NLP Part-of-Speech tagging...</div>';
            const sortedNouns = await parseTweetNouns();

            // Format top 10 nouns for the UI display
            let rowsHtml = '';
            sortedNouns.slice(0, 10).forEach(([noun, count]) => {
                rowsHtml += `<div>• <strong>${noun}</strong>: ${count.toLocaleString()} occurrences</div>`;
            });

            output.innerHTML = `
                <div style="margin-top: 15px; padding: 12px; border: 1px solid #e4e4e7; border-radius: 6px; font-family: monospace;">
                    <div>Unique Nouns Identified: ${sortedNouns.length.toLocaleString()}</div>
                    <div style="margin-top: 8px; font-weight: bold; color: #16a34a;">Top 10 Most Frequent Nouns:</div>
                    <div style="margin-top: 4px; padding-left: 8px; line-height: 1.4;">
                        ${rowsHtml}
                    </div>
                </div>
            `;
        });
    }

    /* 3.4.3 Proper Nouns Frequency Parsing */
    const properNounsRoot = document.getElementById('tweet-proper-nouns-root');

    if (properNounsRoot) {
        const properButton = properNounsRoot.querySelector('.calculate');
        const output = properNounsRoot.querySelector('.output');

        properButton.addEventListener('click', async () => {
            const { default: parseTweetProperNouns } = await import('./3/tweet_proper_nouns.js');

            output.innerHTML = '<div>Isolating proper entities and named text tokens...</div>';

            try {
                const sortedProperNouns = await parseTweetProperNouns();

                // Format the top 10 proper nouns for rendering
                let rowsHtml = '';
                sortedProperNouns.slice(0, 10).forEach(([entity, count]) => {
                    rowsHtml += `<div>• <strong>${entity}</strong>: ${count.toLocaleString()} mentions</div>`;
                });

                output.innerHTML = `
                    <div style="margin-top: 15px; padding: 12px; border: 1px solid #e4e4e7; border-radius: 6px; font-family: monospace;">
                        <div>Engine: Named Entity Recognition Layer (Compromise NLP)</div>
                        <div style="margin-top: 8px; font-weight: bold; color: #7c3aed;">Top 10 Most Frequent Proper Nouns:</div>
                        <div style="margin-top: 4px; padding-left: 8px; line-height: 1.4;">
                            ${rowsHtml.length > 0 ? rowsHtml : '<div>No entities found matching exact filters.</div>'}
                        </div>
                    </div>
                `;
            } catch (error) {
                output.innerHTML = `<div style="color: #dc2626; font-family: monospace;">Failed to compile proper nouns: ${error.message}</div>`;
            }
        });
    }

    /* 3.4.4 Monthly Word Frequency Chart Generation */
    const freqRoot = document.getElementById('tweet-frequency-root');
    let frequencyChartInstance = null;

    if (freqRoot) {
        const freqButton = freqRoot.querySelector('.calculate');
        const output = freqRoot.querySelector('.output');
        const canvasContainer = freqRoot.querySelector('.canvas-container');
        const canvas = document.getElementById('monthly-frequency-chart');

        freqButton.addEventListener('click', async () => {
            const { default: parseMonthlyWordFrequency } = await import('./3/tweet_month_frequency.js');
            const { default: Chart } = await import('https://cdn.jsdelivr.net/npm/chart.js/auto/+esm');
            const targetWord = document.getElementById('freq-keyword').value || 'the';

            output.innerHTML = '<div>Scanning temporal metrics from tweet fields...</div>';

            try {
                const dataProfile = await parseMonthlyWordFrequency(targetWord);

                if (canvasContainer) canvasContainer.style.display = 'block';
                if (frequencyChartInstance) frequencyChartInstance.destroy();

                // Instantiate standard interactive browser bar chart via Chart.js
                frequencyChartInstance = new Chart(canvas.getContext('2d'), {
                    type: 'bar',
                    data: {
                        labels: dataProfile.months,
                        datasets: [{
                            label: `Occurrences of "${targetWord}"`,
                            data: dataProfile.counts,
                            backgroundColor: '#2563eb',
                            borderColor: '#1d4ed8',
                            borderWidth: 1,
                            borderRadius: 4
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { display: true, position: 'top' }
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                title: { display: true, text: 'Frequency Count' }
                            },
                            x: {
                                title: { display: true, text: 'Monthly Interval (YYYY-MM)' }
                            }
                        }
                    }
                });

                const totalMentions = dataProfile.counts.reduce((sum, val) => sum + val, 0);
                output.innerHTML = `
                    <div style="margin-top: 15px; padding: 12px; border: 1px solid #e4e4e7; border-radius: 6px; font-family: monospace;">
                        <div>Query Token: <strong>"${targetWord}"</strong></div>
                        <div style="margin-top: 4px; font-weight: bold; color: #10b981;">
                            Total Global Occurrences: ${totalMentions.toLocaleString()} times
                        </div>
                    </div>
                `;
            } catch (err) {
                output.innerHTML = `<div style="color: #dc2626;">Error drawing chart: ${err.message}</div>`;
            }
        });
    }

    /* 3.4.5 Noun Popularity Coefficient Ranking Matrix */
    const popRatingRoot = document.getElementById('tweet-popularity-rating-root');

    if (popRatingRoot) {
        const popRatingButton = popRatingRoot.querySelector('.calculate');
        const output = popRatingRoot.querySelector('.output');

        popRatingButton.addEventListener('click', async () => {
            const { default: parseNounPopularityRating } = await import('./3/tweet_popularity_rating.js');

            output.innerHTML = '<div>Normalizing multi-variable parameters and calculating metrics...</div>';

            try {
                const rankedNouns = await parseNounPopularityRating();

                let rowsHtml = '';
                rankedNouns.slice(0, 10).forEach((item, index) => {
                    rowsHtml += `<div>${index + 1}. <strong>${item.noun}</strong> — Rating: ${item.score.toFixed(2)} (Freq: ${item.frequency})</div>`;
                });

                output.innerHTML = `
                    <div style="margin-top: 15px; padding: 12px; border: 1px solid #e4e4e7; border-radius: 6px; font-family: monospace;">
                        <div>Engine: Min-Max Normalization Parser Matrix</div>
                        <div style="margin-top: 8px; font-weight: bold; color: #d97706;">Top 10 Most Popular Nouns (By Rating):</div>
                        <div style="margin-top: 4px; padding-left: 8px; line-height: 1.5;">
                            ${rowsHtml}
                        </div>
                    </div>
                `;
            } catch (err) {
                output.innerHTML = `<div style="color: #dc2626;">Error calculating popularity models: ${err.message}</div>`;
            }
        });
    }

    /* 3.4.6 Auto-complete Word Prefix Suggestion Engine */
    const suggestRoot = document.getElementById('tweet-suggestion-root');

    if (suggestRoot) {
        const suggestButton = suggestRoot.querySelector('.calculate');
        const output = suggestRoot.querySelector('.output');

        suggestButton.addEventListener('click', async () => {
            const { default: getWordSuggestions } = await import('./3/tweet_suggestion.js');
            const prefixInput = document.getElementById('suggest-prefix').value;

            output.innerHTML = '<div>Indexing prefixes and evaluating word vectors...</div>';

            try {
                const recommendations = await getWordSuggestions(prefixInput);

                if (recommendations.length === 0) {
                    output.innerHTML = `<div style="margin-top: 15px; color: #6b7280;">No suggestions found starting with "${prefixInput}".</div>`;
                    return;
                }

                // Format predictions into the output target
                let resultStrings = recommendations.map(([word, freq]) => `<strong>${word}</strong> (${freq})`);

                output.innerHTML = `
                    <div style="margin-top: 15px; padding: 12px; border: 1px solid #e4e4e7; border-radius: 6px; font-family: monospace;">
                        <div>Input Prefix: <span style="background-color: #f3f4f6; padding: 2px 6px; border-radius: 4px;">"${prefixInput}"</span></div>
                        <div style="margin-top: 8px; font-weight: bold; color: #2563eb;">Output Suggestions:</div>
                        <div style="margin-top: 4px; padding-left: 8px; font-size: 14px;">
                            ${resultStrings.join(', ')}
                        </div>
                    </div>
                `;
            } catch (err) {
                output.innerHTML = `<div style="color: #dc2626;">Error computing prediction profiles: ${err.message}</div>`;
            }
        });
    }
});