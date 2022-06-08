import mongoose from 'mongoose';
import { Request, Response } from 'express';

const removeInvalidFieldsFromArray = (
  fields: Array<string>,
  model: mongoose.Model<mongoose.Document>
) => {
  return fields.filter((field) => {
    const validFields = Object.keys(model.schema.obj);
    validFields.unshift('_id');
    return validFields.includes(field);
  });
};

const removeInvalidFieldsFromObject = (
  obj: Object,
  model: mongoose.Model<mongoose.Document>
) => {
  const validFields = Object.keys(model.schema.obj);
  validFields.unshift('_id');
  return Object.keys(obj).reduce((acc, key) => {
    if (validFields.includes(key)) {
      acc[key] = obj[key];
    }
    return acc;
  }, {});
};

export const getAllDocumentAndSendResponse = async (
  req: Request,
  res: Response,
  model: mongoose.Model<mongoose.Document>,
  filter = {},
  populateFields = [],
  searchIn = []
) => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const skip = parseInt(req.query.skip as string, 10) || (page - 1) * limit;
    const sort = (req.query.sort as string) || '-createdAt';
    const q = (req.query.q as string) || '';
    let modelKeys = Object.keys(model.schema.obj);
    modelKeys.unshift('_id');

    let mongoQuery: any = req.query.mongoQuery || null;
    console.log(mongoQuery);
    //in list filter
    let inListKey = '';
    let inListValue = '';
    if (req.query.inList) {
      inListKey = modelKeys.find(
        (field: any) =>
          req?.query?.inList !== null &&
          Object.keys(req?.query?.inList)[0] === field
      );
      inListValue = req?.query?.inList[inListKey].split(',');
    }

    //not in list filter
    let notInListKey = '';
    let notInListValue = '';
    if (req.query.notInList) {
      notInListKey = modelKeys.find(
        (field: any) =>
          req?.query?.notInList !== null &&
          Object.keys(req?.query?.notInList)[0] === field
      );
      notInListValue = req?.query?.notInList[notInListKey].split(',');
    }

    filter = { ...req.query, ...filter };
    filter = removeInvalidFieldsFromObject(filter, model);

    let fields = (req.query.fields as any) || '';
    //convert fields to array
    fields = fields.split(',');
    //remove empty fields
    fields = fields.filter((field) => field);
    //remove duplicates
    fields = [...new Set(fields)];

    //for search in fields
    let searchQuery = [];
    if (q) {
      searchIn = removeInvalidFieldsFromArray(searchIn, model);
      searchIn.forEach((field) => {
        searchQuery.push({ [field]: { $regex: q, $options: 'i' } });
      });
    }

    if (searchQuery.length > 0) {
      let key = '$or';
      let val = searchQuery;
      filter[key] = val;
    }
    const query = model
      .find({
        ...filter,
        ...(inListValue && { [inListKey]: { $in: inListValue } }),
        ...(notInListValue && { [notInListKey]: { $nin: notInListValue } }),
        ...(mongoQuery && JSON.parse(mongoQuery)),
      })
      .skip(skip)
      .limit(limit)
      .sort(sort);

    //for populate fields
    if (populateFields.length > 0) {
      populateFields.forEach((field) => {
        query.populate(field);
      });
    }

    //for selecting fields
    if (fields) {
      fields.map((field) => query.select(field));
    }

    const data = await query;
    const total = await model.countDocuments({
      ...filter,
      ...(inListValue && { [inListKey]: { $in: inListValue } }),
      ...(notInListValue && { [notInListKey]: { $nin: notInListValue } }),
      ...(mongoQuery && JSON.parse(mongoQuery)),
    });
    const pages = Math.ceil(total / limit);
    const pageInfo = {
      currentPage: page,
      perPage: limit,
      pageCount: pages,
      skipCount: skip,
      itemCount: total,
      hasNextPage: page < pages,
      hasPreviousPage: page > 1,
    };
    res.status(200).json({
      status: 'success',
      data,
      pageInfo,
    });
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
};

export default getAllDocumentAndSendResponse;
