const loanInfo = {
  newLoan: {
    amount: 10000,
    tenor: 2,
  },
  omitTenor: {
    amount: 10000,
  },
  omitAmount: {
    tenor: 2,
  },
  statusApprove: {
    status: 'approved',
  },
  statusReject: {
    status: 'rejected',
  },
  wrongStatus: {
    status: 'sasasas',
  },
  statusVerify: {
    status: 'verified',
  },
  repaymentAmount: {
    paidAmount: 2625.00, //
  },
  invalidAmount: {
    paidAmount: 'ssss', //
  },
  highAmount: {
    paidAmount: 100000, //
  },
  repayStatus: {
    status: 'pending',
  },
};

export default loanInfo;
