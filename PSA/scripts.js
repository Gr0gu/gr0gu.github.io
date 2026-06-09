
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
    const birthdayAttack = await import('./1/birthday_attack.js');
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
});