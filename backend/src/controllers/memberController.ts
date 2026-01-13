import { Request, Response } from 'express';
import { db } from '../models/database';
import { MemberStatus } from '../models/types';

export class MemberController {
  static getAllMembers = (req: Request, res: Response) => {
    const members = db.getAllMembers();
    res.json({ success: true, data: members });
  };

  static getMemberByNumber = (req: Request, res: Response) => {
    const { membershipNumber } = req.params;
    const member = db.findMemberByNumber(membershipNumber);

    if (!member) {
      return res.status(404).json({ success: false, message: 'Member not found' });
    }

    res.json({ success: true, data: member });
  };

  static addMember = (req: Request, res: Response) => {
    const { memberName, address, phoneNo, startDate } = req.body;

    if (!memberName || !startDate) {
      return res.status(400).json({ 
        success: false, 
        message: 'Member name and start date are required' 
      });
    }

    // Generate membership number
    const membershipNumber = `MEM${String(db.getAllMembers().length + 1).padStart(3, '0')}`;

    // Calculate end date (6 months from start date)
    const start = new Date(startDate);
    const end = new Date(start);
    end.setMonth(end.getMonth() + 6);

    const newMember = {
      membershipNumber,
      memberName,
      address: address || '',
      phoneNo: phoneNo || '',
      startDate: start.toISOString().split('T')[0],
      endDate: end.toISOString().split('T')[0],
      status: MemberStatus.ACTIVE
    };

    db.addMember(newMember);
    res.json({ success: true, data: newMember, message: 'Member added successfully' });
  };

  static updateMember = (req: Request, res: Response) => {
    const { membershipNumber } = req.params;
    const { extendMembership } = req.body;

    const member = db.findMemberByNumber(membershipNumber);
    if (!member) {
      return res.status(404).json({ success: false, message: 'Member not found' });
    }

    const updates: any = {};

    if (extendMembership) {
      // Extend membership by 6 months from current end date
      const currentEndDate = new Date(member.endDate);
      currentEndDate.setMonth(currentEndDate.getMonth() + 6);
      updates.endDate = currentEndDate.toISOString().split('T')[0];
    }

    const success = db.updateMember(membershipNumber, updates);
    if (success) {
      const updatedMember = db.findMemberByNumber(membershipNumber);
      res.json({ success: true, data: updatedMember, message: 'Member updated successfully' });
    } else {
      res.status(500).json({ success: false, message: 'Failed to update member' });
    }
  };
}
