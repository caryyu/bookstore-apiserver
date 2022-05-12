/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('books').del()
  await knex('books').insert([
    {id: 1, title: 'The Road to React', author: 'Robin Wieruch', price: 55.5},
    {id: 2, title: 'How to Lead in Data Science', author: 'Dr. Jike Chong and Yue Cathy Chang', price: 105.5},
    {id: 3, title: 'Testing JavaScript Applications', author: 'Lucas da Costa', price: 88},
  ]);
};
