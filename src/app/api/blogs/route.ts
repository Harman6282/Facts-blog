export const POST = async (req: Request) => {
  const {title, content, slug} = await req.json();

  if (!title || !content || !slug) {
    return Response.json({
      success: false,
      message: "All fields are required",
    });
  }

  return  Response.json({
    success: true,
    message: "Blog created successfully"
  });
};
