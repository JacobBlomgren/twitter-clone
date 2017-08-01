export default function logout(req, res) {
  req.logout();
  res.status(200).json({ status: 'Success' });
}
