import emailjs from "@emailjs/browser";

export const sendEmail = (params, recipient) => {
  let templateID;
  if (recipient === "user") {
    templateID = import.meta.env.VITE_APP_USER_TEMPLATE_ID;
  }
  if (recipient === "guest") {
    templateID = import.meta.env.VITE_APP_GUEST_TEMPLATE_ID;
  }

  emailjs
    .send(
      import.meta.env.VITE_APP_SERVICE_ID,
      templateID,
      params,
      import.meta.env.VITE_APP_PUBLIC_KEY
    )
    .then(
      (result) => {
        console.log(result.text);
        return { status: "success" };
      },
      (error) => {
        console.log(error.text);
        return { status: "faile" };
      }
    );
};
