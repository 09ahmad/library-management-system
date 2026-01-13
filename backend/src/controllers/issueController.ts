import { Request, Response } from 'express';
import { db } from '../models/database';
import { BookAvailability } from '../models/types';

export class IssueController {
  static createIssue = (req: Request, res: Response) => {
    const { membershipNumber, bookName, serialNo, issueDate } = req.body;

    if (!membershipNumber || !bookName || !serialNo) {
      return res.status(400).json({ 
        success: false, 
        message: 'Membership number, book name, and serial number are required' 
      });
    }

    // Check if member exists and is active
    const member = db.findMemberByNumber(membershipNumber);
    if (!member) {
      return res.status(404).json({ success: false, message: 'Member not found' });
    }
    if (member.status !== 'Active') {
      return res.status(400).json({ success: false, message: 'Member is not active' });
    }

    // Check if book exists and is available
    const book = db.findBookBySerial(serialNo);
    if (!book) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }
    if (book.availability !== BookAvailability.AVAILABLE) {
      return res.status(400).json({ success: false, message: 'Book is not available' });
    }

    // Calculate due date (30 days from issue date)
    const issue = new Date(issueDate || new Date().toISOString().split('T')[0]);
    const due = new Date(issue);
    due.setDate(due.getDate() + 30);

    const newIssue = {
      id: `ISS${String(db.getAllIssues().length + 1).padStart(3, '0')}`,
      membershipNumber,
      bookName,
      serialNo,
      issueDate: issue.toISOString().split('T')[0],
      dueDate: due.toISOString().split('T')[0],
      fineAmount: 0
    };

    db.createIssue(newIssue);
    res.json({ success: true, data: newIssue, message: 'Book issued successfully' });
  };

  static getActiveIssues = (req: Request, res: Response) => {
    const issues = db.getActiveIssues();
    res.json({ success: true, data: issues });
  };

  static getOverdueIssues = (req: Request, res: Response) => {
    const issues = db.getOverdueIssues();
    const today = new Date().toISOString().split('T')[0];
    
    const overdueIssues = issues.map(issue => {
      const dueDate = new Date(issue.dueDate);
      const todayDate = new Date(today);
      const daysOverdue = Math.floor((todayDate.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24));
      
      // Calculate fine (assuming $1 per day)
      const fineAmount = daysOverdue * 1;
      
      return {
        ...issue,
        overdueDays: daysOverdue,
        fineAmount
      };
    });

    res.json({ success: true, data: overdueIssues });
  };

  static returnBook = (req: Request, res: Response) => {
    const { serialNo, returnDate, remarks } = req.body;

    if (!serialNo || !returnDate) {
      return res.status(400).json({ 
        success: false, 
        message: 'Serial number and return date are required' 
      });
    }

    const returnedIssue = db.returnBook(serialNo, returnDate, remarks);
    
    if (!returnedIssue) {
      return res.status(404).json({ 
        success: false, 
        message: 'Active issue not found for this book' 
      });
    }

    res.json({ 
      success: true, 
      data: returnedIssue, 
      message: 'Book returned successfully',
      fineAmount: returnedIssue.fineAmount
    });
  };

  static getAllIssues = (req: Request, res: Response) => {
    const issues = db.getAllIssues();
    res.json({ success: true, data: issues });
  };
}
