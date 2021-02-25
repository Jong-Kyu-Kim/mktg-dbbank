const customerGlobal = filter => {
  const { history, returned, date } = filter;
  const keyword = new RegExp(filter.keyword, 'gi');
  const unsubscribe = filter.unsubscribe ? { $gt: new Date(0) } : { $lte: new Date(0) }
  const dateRange = { date: { $gte: new Date(date.fromDate), $lte: new Date(date.toDate) } }

  const $and = [
    date.history ? { histories: { $elemMatch: dateRange } } : dateRange,
    { unsubscribe },
    { returned: returned ? { $not: {$eq: ''}} : '' },
    { $or: [
      { [history ? 'histories.name' : 'name']: keyword },
      { [history ? 'histories.company' : 'company']: keyword },
      { [history ? 'histories.department' : 'department']: keyword },
      { [history ? 'histories.position' : 'position']: keyword },
      { [history ? 'histories.email' : 'email']: keyword },
      { [history ? 'histories.phone' : 'phone']: keyword },
      { [history ? 'histories.classification' : 'classification']: keyword },
      { [history ? 'histories.from' : 'from']: keyword },
      { [history ? 'histories.note' : 'from']: keyword },
      { returned: keyword }
    ]},
    // { 'histories.from': '2012 ISEC' },
    
    // { $and: [
    //   { $and: [
    //     { department: { $not: { $eq: '' } } }
    //   ]},
    //   { $and: [
    //     { classification: { $not: { $eq: '공공' } } },
    //     { classification: { $not: { $eq: '방송' } } }
    //   ]}
    // ] }
  ];
	return $and;
}

const customerAttr = (filter, target) => {
  const targets = Object.keys(filter).filter(key => {
    return (filter[key].items && filter[key].items.length) || filter[key].keyword;
  }).filter(key => target !== key);  

  if (!targets.length) return {}

  const $and = targets.map(key => {
    const thisTarget = filter[key];
    const objKey = thisTarget.history ? `histories.${key}` : key;

    if (thisTarget.include) {
      return {
        $or: thisTarget.items.map(item => {
          return { [objKey]: { $eq: item } }
        })
        // .concat(thisTarget.keyword ? [{
        //   [key]: new RegExp(thisTarget.keyword, 'gi')
        // }] : [])
      }
    }
    return {
      $and: thisTarget.items.map(item => {
        return { [objKey]: { $not: { $eq: item } } }
      })
      .concat([{
        [objKey]: new RegExp(thisTarget.keyword, 'gi')
      }])      
    }
  });

  return $and;
}

module.exports = {
  dbbankCount: async(obj, args, ctx) => {
    const { filter } = args;

    // console.log(JSON.stringify({
    //   $and: customerGlobal(filter).concat(customerAttr(filter))
    // },null,2))

    return await ctx.dbbankCustomers.find({
      $and: customerGlobal(filter).concat(customerAttr(filter))
    }).countDocuments();    
  },
  dbbankCustomers: async(obj, args, ctx) => {    
    const { filter, skip, limit } = args;
    const sort = args.sort.reduce((obj, item) => {
      return {
        ...obj,
        ...item
      }
    }, {});

    return await ctx.dbbankCustomers.find({
      $and: customerGlobal(filter).concat(customerAttr(filter))
    }).sort(sort).skip(skip).limit(limit);

    // return await ctx.dbbankCustomers.aggregate([
    //   { $match: { $and: customerGlobal(filter).concat(customerAttr(filter)) } },
    //   { $addFields: { size: { $size: '$histories' } } }, 
    //   { $sort: sort },		
    //   { $skip: skip },
    //   { $limit: limit }
    // ])    
  },

  dbbankTargetItems: (async(obj, args, ctx) => {
    const { filter, target, skip } = args;
    const { keyword, history } = filter[target];

    const group = history ? [
      { $unwind: '$histories' },
      { $match: keyword ? { [`histories.${target}`]: new RegExp(keyword, 'gi') } : {} },
      { $group: { _id: `$histories.${target}` }},      
    ] : [
      { $match: keyword ? { [target]: new RegExp(keyword, 'gi') } : {} },
      { $group: { _id: `$${target}`, }},
    ]    

    // console.log(JSON.stringify(filter))

    return await ctx.dbbankCustomers.aggregate([
      { $match: { $and: customerGlobal(filter).concat(customerAttr(filter, target)) } },      
    ].concat(group).concat([
      { $sort: { _id: 1 }},		
      { $skip: skip },
      { $limit: target === 'from' ? 150 : 40 }
    ]));
  })
}