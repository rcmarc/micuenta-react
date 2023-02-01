import mongo from '.';

export async function getUserSecurityQuestions(filter) {
  const query = await mongo.users.findOne(filter, {
    securityQuestions: 1,
  });

  const securityQuestions = query ? query.securityQuestions || [] : [];

  if (!securityQuestions || securityQuestions.length === 0) {
    return [];
  }
  return await Promise.all(
    securityQuestions.map(async (q) => {
      return {
        ...(await mongo.securityQuestions.findOne({
          _id: q.questionId,
        })),
        ...q,
      };
    })
  );
}
