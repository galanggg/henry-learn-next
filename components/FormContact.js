import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Alert,
  AlertIcon,
  Button,
  Input,
  Textarea,
  useToast
} from '@chakra-ui/core';
import { Fade, ScaleFade, Slide, SlideFade } from '@chakra-ui/transition';

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { omit } from 'lodash';
import ReCAPTCHA from 'react-google-recaptcha';
import { createRef } from 'react';

const recaptchaRef = React.createRef();

const SignupSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Too Short!').max(70, 'Too Long!').required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  message: Yup.string().required('Required'),
  recaptcha: Yup.string().required('Required')
});

const FormContact = () => {
  const toast = useToast();
  return (
    <Formik
      initialValues={{ name: '', email: '', message: '', recaptcha: '' }}
      validationSchema={SignupSchema}
      onSubmit={(values, actions) => {
        const cleanvalues = omit(values, 'recaptcha');
        fetch(process.env.NEXT_PUBLIC_PAGECLIP_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            Accept: 'application/json'
          },
          body: JSON.stringify(cleanvalues)
        })
          .then(function (response) {
            console.log(response);
            actions.setSubmitting(false);
            actions.resetForm({ values: '' });
            recaptchaRef.current.reset();

            if (response.ok) {
              //   Simpen aja siapa tau nanti butuh buat set status ke props
              //   actions.setStatus({
              //     sent: true,
              //     error: false
              //   });
              toast({
                title: 'Message sent.',
                description: "We've received your message, we will get back to you ASAP.",
                status: 'success',
                duration: 5000,
                isClosable: true
              });
            } else {
              toast({
                title: 'Message is not sent.',
                description: "We've an error on our end, please try again.",
                status: 'error',
                duration: 5000,
                isClosable: true
              });
            }
          })
          .catch(function (error) {
            console.error(error);
          });
      }}
    >
      {(props) => {
        return (
          <>
            <Form>
              <Field name="name">
                {({ field, form }) => (
                  <FormControl mt="3" isInvalid={form.errors.name && form.touched.name}>
                    <Input
                      {...field}
                      id="name"
                      placeholder="Your Name"
                      borderRadius="0"
                      variant="flushed"
                      focusBorderColor="palletGoldSoft"
                      errorBorderColor="palletGoldHard"
                    />
                    <FormErrorMessage color="palletGoldHard">{form.errors.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field type="email" name="email">
                {({ field, form }) => (
                  <FormControl mt="3" isInvalid={form.errors.email && form.touched.email}>
                    <Input
                      {...field}
                      id="email"
                      placeholder="Email"
                      borderRadius="0"
                      variant="flushed"
                      focusBorderColor="palletGoldSoft"
                      errorBorderColor="palletGoldHard"
                    />
                    <FormErrorMessage color="palletGoldHard">{form.errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="message">
                {({ field, form }) => (
                  <FormControl mt="3" isInvalid={form.errors.message && form.touched.message}>
                    <Textarea
                      {...field}
                      id="textarea"
                      placeholder="Message"
                      borderRadius="0"
                      variant="flushed"
                      focusBorderColor="palletGoldSoft"
                      errorBorderColor="palletGoldHard"
                    />
                    <FormErrorMessage color="palletGoldHard">
                      {form.errors.message}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="recaptcha">
                {({ field, form }) => (
                  <FormControl mt="3" isInvalid={form.errors.message && form.touched.message}>
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                      onChange={(result) => {
                        form.setFieldValue('recaptcha', result);
                      }}
                    />
                    <FormErrorMessage color="palletGoldHard">
                      {form.errors.message}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button
                fontWeight="normal"
                borderRadius="0"
                mt={4}
                bg="palletBlue"
                color="white"
                _hover={{ color: 'palletBlue', bg: 'palletGoldSoft' }}
                isLoading={props.isSubmitting}
                type="submit"
              >
                Submit
              </Button>
            </Form>
            {/* <ScaleFade initialScale={0.9} timeout={450} in={props.status && props.status.sent}>
              {(styles) => (
                <Alert style={styles} mt="5" status="success">
                  <AlertIcon />
                  Message is sent!
                </Alert>
              )}
            </ScaleFade> */}
          </>
        );
      }}
    </Formik>
  );
};

export default FormContact;
