import { Request, Response } from 'express';
import { db } from '../models/database';
import { PaymentMode } from '../models/types';

export class FineController {
  static payFine = (req: Request, res: Response) => {
    const { membershipNumber, bookName, fineAmount, paymentMode } = req.body;

    if (!membershipNumber || !bookName || !fineAmount || !paymentMode) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }

    // Find the issue
    const issues = db.getAllIssues();
    const issue = issues.find(i => 
      i.membershipNumber === membershipNumber && 
      i.bookName === bookName &&
      !i.returnDate
    );

    if (!issue) {
      return res.status(404).json({ 
        success: false, 
        message: 'Issue not found' 
      });
    }

    if (issue.fineAmount !== fineAmount) {
      return res.status(400).json({ 
        success: false, 
        message: 'Fine amount mismatch' 
      });
    }

    const payment = {
      id: `PAY${String(db.getAllIssues().length + 1).padStart(3, '0')}`,
      membershipNumber,
      bookName,
      fineAmount: parseFloat(fineAmount),
      paymentMode: paymentMode as PaymentMode,
      paymentDate: new Date().toISOString().split('T')[0]
    };

    db.addFinePayment(payment);
    res.json({ success: true, data: payment, message: 'Fine paid successfully' });
  };
}
