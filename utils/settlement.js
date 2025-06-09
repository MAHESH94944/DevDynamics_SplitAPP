function calculateBalances(expenses) {
  const balances = {};
  expenses.forEach((exp) => {
    // Normalize payer name
    const payer = exp.paid_by.trim();
    balances[payer] = (balances[payer] || 0) + exp.amount;
    exp.splits.forEach((split) => {
      // Normalize split person name
      let person = split.person.trim();
      let shareValue;
      if (exp.split_type === "percentage") {
        shareValue = (split.share / 100) * exp.amount;
      } else {
        // exact or equal
        shareValue = split.share;
      }
      // Always round to 2 decimals to avoid floating point issues
      shareValue = Math.round(shareValue * 100) / 100;
      balances[person] = (balances[person] || 0) - shareValue;
    });
  });
  // Round all balances to 2 decimals
  Object.keys(balances).forEach(
    (k) => (balances[k] = Math.round(balances[k] * 100) / 100)
  );
  return balances;
}

// Robust minimizeTransactions: always match largest debtor to largest creditor
function minimizeTransactions(balances) {
  const settlements = [];
  // Convert balances to array and round to 2 decimals
  let people = Object.entries(balances)
    .map(([person, balance]) => ({
      person,
      balance: Math.round(balance * 100) / 100,
    }))
    .filter((p) => Math.abs(p.balance) > 0.01);

  // Loop until all balances are settled
  while (people.length > 1) {
    // Always sort after each transaction!
    people.sort((a, b) => a.balance - b.balance);
    const debtor = people[0]; // most negative
    const creditor = people[people.length - 1]; // most positive

    const amount = Math.min(-debtor.balance, creditor.balance);
    if (amount > 0.01) {
      settlements.push({
        from: debtor.person,
        to: creditor.person,
        amount: Math.round(amount * 100) / 100,
      });
      debtor.balance += amount;
      creditor.balance -= amount;
    }

    // Remove settled people (after updating balances)
    people = people.filter((p) => Math.abs(p.balance) > 0.01);
  }

  return settlements;
}

module.exports = { calculateBalances, minimizeTransactions };
