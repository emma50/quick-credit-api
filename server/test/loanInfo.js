const loanInfo = {
  newLoan: {
    amount: 10000,
    tenor: 2,
  },
  ommitTenor: {
    amount: 10000,
  },
  ommitAmount: {
    tenor: 2,
  },
  statusApprove: {
    status: 'approved',
  },
  wrongStatus: {
    status: 'sasasas',
  },
  repaymentAmount: {
    paidAmount: 2625.00,
  },
  invalidAmount: {
    paidAmount: 'ssss',
  },
  highAmount: {
    paidAmount: 100000,
  },
  statusVerify: {
    status: 'verified',
  },
  repayStatus: {
    status: 'pending',
  },
};

export default loanInfo;
