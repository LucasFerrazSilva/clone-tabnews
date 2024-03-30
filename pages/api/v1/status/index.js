function status(request, response) {
  response.status(200).json({ message: "São acima da média" });
}

export default status;
