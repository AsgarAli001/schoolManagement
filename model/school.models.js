import db from "../config/db.js";

const addSchool = (name, address, latitude, longitude) => {
  const query = `INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)`;
  return db.execute(query, [name, address, latitude, longitude]);
};

const getAllSchools = () => {
  const query = `SELECT * FROM schools`;
  return db.execute(query);
};

const latAndLong = async () => {
  const query = `SELECT latitude, longitude FROM schools`;
  const [rows] = await db.execute(query);
  return rows;
};
export { addSchool, getAllSchools, latAndLong };
