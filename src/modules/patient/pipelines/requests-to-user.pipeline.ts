import { Types } from 'mongoose';
import { PatientPermessionStatusEnum } from '../enums/patient-parmession-status.enum';
export function RequestsToUserPipeline(userId, page = 1, limit = 10, status?: PatientPermessionStatusEnum) {
  return [
    {
      $match: {
        createdBy: Types.ObjectId(userId),
      },
    },
    {
      $unwind: '$accessRequests',
    },
    {
      $match: {
        ...(status ? { 'accessRequests.status': status } : {}),
      },
    },
    {
      $lookup: {
        from: 'auth',
        localField: 'accessRequests.requestedBy',
        foreignField: '_id',
        as: 'accessRequests.requestedBy',
      },
    },
    {
      $unwind: '$accessRequests.requestedBy',
    },
    {
      $sort: {
        'accessRequests.createdAt': -1,
      },
    },
    {
      $group: {
        _id: null,
        docs: { $push: '$$ROOT' },
        totalDocs: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        totalDocs: 1,
        docs: { $slice: ['$docs', page - 1, limit] },
      },
    },
  ];
}
