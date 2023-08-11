// function paginatedResults(model) {
//   return async (req, res, next) => {
//     const page = Number(req.query.page);
//     const limit = Number(req.query.limit);
//     const startIndex = (page - 1) * limit;
//     const endIndex = page * limit;

//     const results = {};

//     if (endIndex < model.length) {
//       results.next = {
//         page: page + 1,
//         limit,
//       };
//     }

//     if (startIndex > 0) {
//       results.previous = {
//         page: page - 1,
//         limit,
//       };
//     }

//     try {
//       results.result = await model.find().limit(limit).skip(startIndex);
//       res.paginatedResults = results;
//       next();
//     } catch (err) {
//       res.status(500).json({ error: 'message' });
//     }
//   };
// }

// module.exports = {
//   paginatedResults, // Exporta la función paginatedResults
// };
