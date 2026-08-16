const { users, getNextId } = require("../data/users.data");

const getAll = (req, res) => {
  res.json({ success: true, data: users });
};

const getOne = (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ success: false, message: "User topilmadi" });
  res.json({ success: true, data: user });
};

const create = (req, res) => {
  const { name, email, age } = req.body;

  if (!name || !email) {
    return res.status(400).json({ success: false, message: "Ism va email majburiy" });
  }

  if (users.find((u) => u.email === email)) {
    return res.status(400).json({ success: false, message: "Bu email allaqachon mavjud" });
  }

  const newUser = { id: getNextId(), name, email, age: age || null };
  users.push(newUser);

  res.status(201).json({ success: true, message: "User yaratildi", data: newUser });
};

const update = (req, res) => {
  const index = users.findIndex((u) => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ success: false, message: "User topilmadi" });

  const { name, email, age } = req.body;
  users[index] = {
    ...users[index],
    name: name || users[index].name,
    email: email || users[index].email,
    age: age ?? users[index].age,
  };

  res.json({ success: true, message: "User yangilandi", data: users[index] });
};

const remove = (req, res) => {
  const index = users.findIndex((u) => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ success: false, message: "User topilmadi" });

  const deleted = users.splice(index, 1)[0];
  res.json({ success: true, message: "User o'chirildi", data: deleted });
};

module.exports = { getAll, getOne, create, update, remove };
