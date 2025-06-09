function validateExpenseInput(data) {
  if (typeof data.amount !== "number" || isNaN(data.amount)) {
    return "Amount must be a valid number";
  }
  if (data.amount <= 0) {
    return "Amount must be a positive number";
  }
  if (typeof data.description !== "string" || !data.description.trim()) {
    return "Description is required";
  }
  if (typeof data.paid_by !== "string" || !data.paid_by.trim()) {
    return "paid_by is required";
  }
  if (!["equal", "percentage", "exact"].includes(data.split_type)) {
    return "Split type must be one of: equal, percentage, exact";
  }
  if (!Array.isArray(data.splits) || data.splits.length === 0) {
    return "At least one split is required";
  }

  let totalSplit = 0;
  for (const split of data.splits) {
    if (typeof split.person !== "string" || !split.person.trim()) {
      return "Each split must have a valid person name";
    }
    if (typeof split.share !== "number" || isNaN(split.share)) {
      return "Each split share must be a valid number";
    }
    if (split.share < 0) {
      return "Split share must be non-negative";
    }
    totalSplit += split.share;
  }

  if (
    ["exact", "equal"].includes(data.split_type) &&
    Math.abs(totalSplit - data.amount) > 0.01
  ) {
    return "Split shares do not add up to total amount";
  }

  if (data.split_type === "percentage" && Math.abs(totalSplit - 100) > 0.01) {
    return "Split percentages must add up to 100";
  }
  return null;
}

module.exports = { validateExpenseInput };
