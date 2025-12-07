"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "izitoast/dist/css/iziToast.min.css";
import styles from "./Form.module.css";

export default function Form() {
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "Name is too short")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    bookingDate: Yup.date()
      .nullable()
      .typeError("Select a valid date")
      .required("Booking date is required"),
    comment: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      bookingDate: null as Date | null,
      comment: "",
    },
    validationSchema,
    onSubmit: async (_, { resetForm }) => {
      // UI-only "submit"
      try {
        const iziToast = (await import("izitoast")).default;
        iziToast.success({
          title: "Success",
          message: "Booking request sent!",
          position: "topRight",
          timeout: 3000,
          progressBar: true,
        });

        resetForm();
      } catch {
        const iziToast = (await import("izitoast")).default;
        iziToast.error({
          title: "Error",
          message: "Failed to send booking.",
          position: "topRight",
          timeout: 3500,
          progressBar: true,
        });
      }
    },
  });

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>Book your campervan now</h2>
      <p className={styles.formSubtitle}>
        Stay connected! We are always ready to help you.
      </p>

      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <div className={styles.inputWrapper}>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Name*"
            className={`${styles.input} ${
              formik.touched.name && formik.errors.name
                ? styles.inputError
                : ""
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name && (
            <div className={styles.errorText}>{formik.errors.name}</div>
          )}
        </div>

        <div className={styles.inputWrapper}>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email*"
            className={`${styles.input} ${
              formik.touched.email && formik.errors.email
                ? styles.inputError
                : ""
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <div className={styles.errorText}>{formik.errors.email}</div>
          )}
        </div>

        <div className={styles.inputWrapper}>
          <DatePicker
            selected={formik.values.bookingDate}
            onChange={(date) => formik.setFieldValue("bookingDate", date)}
            onBlur={() => formik.setFieldTouched("bookingDate", true)}
            placeholderText="Booking date*"
            className={`${styles.input} ${
              formik.touched.bookingDate && formik.errors.bookingDate
                ? styles.inputError
                : ""
            }`}
            dateFormat="yyyy-MM-dd"
          />
          {formik.touched.bookingDate && formik.errors.bookingDate && (
            <div className={styles.errorText}>
              {formik.errors.bookingDate}
            </div>
          )}
        </div>

        <div className={styles.inputWrapper}>
          <textarea
            id="comment"
            name="comment"
            placeholder="Comment"
            className={styles.textarea}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.comment}
            rows={4}
          />
        </div>

        <button type="submit" className={styles.button}>
          Send
        </button>
      </form>
    </div>
  );
}
