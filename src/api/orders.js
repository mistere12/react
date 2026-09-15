export async function placeOrder(form) {
  await new Promise((resolve) =>
    setTimeout(resolve, 1000)
  );

  const phone = form.phone.replace(/\s/g, "");

  if (!form.name.trim()) {
    const error = new Error("Validation failed");
    error.status = 422;
    error.fieldErrors = {
      name: "Please enter your name"
    };
    throw error;
  }

  if (!/^(?:\+251|0)9\d{8}$/.test(phone)) {
    const error = new Error("Validation failed");
    error.status = 422;
    error.fieldErrors = {
      phone: "Use 09... or +2519..."
    };
    throw error;
  }

  return {
    id: Date.now(),
    name: form.name,
    phone: form.phone,
    area: form.area,
    notes: form.notes
  };
}