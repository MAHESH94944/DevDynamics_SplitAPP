function calculateBalances(expenses) {
  const balances = {};
  expenses.forEach((exp) => {
    
    const payer = exp.paid_by.trim();
    balances[payer] = (balances[payer] || 0) + exp.amount;
    exp.splits.forEach((split) => {
        
      let person = split.person.trim();
      let shareValue;
      if (exp.split_type === "percentage") {
        shareValue = (split.share / 100) * exp.amount;
      } else {
        
        shareValue = split.share;
      }
      shareValue = Math.round(shareValue * 100) / 100;
      balances[person] = (balances[person] || 0) - shareValue;
    });
  });

  Object.keys(balances).forEach(
    (k) => (balances[k] = Math.round(balances[k] * 100) / 100)
  );
  return balances;
}

function minimizeTransactions(balances) {
  const settlements = [];
  let people = Object.entries(balances)
    .map(([person, balance]) => ({
      person,
      balance: Math.round(balance * 100) / 100,
    }))
    .filter((p) => Math.abs(p.balance) > 0.01);

  while (people.length > 1) {
    people.sort((a, b) => a.balance - b.balance);
    const debtor = people[0]; 
    const creditor = people[people.length - 1];

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

    people = people.filter((p) => Math.abs(p.balance) > 0.01);
  }

  return settlements;
}

module.exports = { calculateBalances, minimizeTransactions };
