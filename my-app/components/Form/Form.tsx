'use client';

import { useFormik } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import axios from "axios";
import styles from "./Form.module.css";

interface FormProps {
  camperId: string;
}

export default function Form({ camperId }: FormProps) {
  const validationSchema = Yup.object({
    name: Yup.string().min(2, "Name is too short").required("Name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    bookingDate: Yup.date().required("Booking date is required").nullable(),
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
    onSubmit: async (values, { resetForm }) => {
      try {
        await axios.post(`${process.env.NEXT_PUBLIC_API_BASE}/bookings`, {
          camperId,
          name: values.name,
          email: values.email,
          bookingDate: values.bookingDate,
          comment: values.comment,
        });

        iziToast.success({
          title: "Success",
          message: "Booking request sent!",
          position: "topRight",
          timeout: 3000,
          progressBar: true,
        });

        resetForm();
      } catch (err) {
        console.error(err);
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
        {/* Name */}
        <div className={styles.inputWrapper}>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Name*"
            className={`${styles.input} ${
              formik.touched.name && formik.errors.name ? styles.inputError : ""
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className={styles.errorText}>{formik.errors.name}</div>
          ) : null}
        </div>

        {/* Email */}
        <div className={styles.inputWrapper}>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email*"
            className={`${styles.input} ${
              formik.touched.email && formik.errors.email ? styles.inputError : ""
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className={styles.errorText}>{formik.errors.email}</div>
          ) : null}
        </div>

        {/* Booking Date */}
        <div className={styles.inputWrapper}>
          <DatePicker
            selected={formik.values.bookingDate}
            onChange={(date: Date | null) =>
              formik.setFieldValue("bookingDate", date)
            }
            onBlur={formik.handleBlur}
            placeholderText="Booking date*"
            className={`${styles.input} ${
              formik.touched.bookingDate && formik.errors.bookingDate
                ? styles.inputError
                : ""
            }`}
            dateFormat="yyyy-MM-dd"
          />
          {formik.touched.bookingDate && formik.errors.bookingDate ? (
            <div className={styles.errorText}>{formik.errors.bookingDate}</div>
          ) : null}
        </div>

        {/* Comment */}
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

        {/* Submit */}
        <button type="submit" className={styles.button}>
          Send
        </button>
      </form>
    </div>
  );
}
