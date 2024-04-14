import * as React from 'react';
import './AuthForm.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { UserFormState } from '../../models/models';
import { Button, TextField } from '@mui/material';
import { useContext, useEffect } from 'react';
import { autoriseUserData, saveUserData } from '../../store/redusers/asyncUserReducer';
import { AuthContext } from '../../context/context';

interface AuthFormProps {
};

const AuthForm: React.FC<AuthFormProps> = ({ }) => {
    const { pathname } = useLocation();
    const { setAuth } = useContext(AuthContext);
    const state = useAppSelector(state => state.user);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { handleSubmit, register, reset, formState: { errors }, clearErrors } = useForm({
        defaultValues: {
            name: state.name || '',
            password: state.password || '',
            mail: state.mail || '',
        },
    });

    useEffect(() => {
        clearErrors();
        reset({
            name: '',
            password: '',
            mail: '',
        });
    }, [pathname]);

    const onSubmit = (data: UserFormState) => {
        if (pathname === '/registration') {
            dispatch(saveUserData(data)).then((res) => {
                if (!res.payload.hasOwnProperty('message')) {
                    setAuth(true);
                    navigate('/');
                }
            });
        } else if (pathname === '/autorise') {
            dispatch(autoriseUserData(data)).then((res) => {
                if (!res.payload.hasOwnProperty('message')) {
                    setAuth(true);
                    navigate('/');
                }
            });
        }

        reset({
            name: '',
            password: '',
            mail: '',
        });
    };
    if (
        pathname !== '/registration' &&
        pathname !== '/autorise'
    ) {
        return (
            <div className="form-wrapper">
                Form not find
            </div>
        );
    }

    return (
        <div className="form-wrapper">
            <h3 className='title-form'>
                {pathname === '/registration' ? 'Registration' : pathname === '/autorise' ? 'Autorise' : ''}
            </h3>
            <form
                onSubmit={handleSubmit(onSubmit)}
            >
                <TextField
                    error={errors.name ? true : false}
                    id="outlined-name-input"
                    label="Login"
                    type="name"
                    fullWidth
                    {...register("name",
                        {
                            required: true,
                            maxLength: {
                                value: 20,
                                message: 'Max length 20',
                            },
                            minLength: {
                                value: 3,
                                message: 'Min length 3'
                            },
                            pattern: /^([a-zа-яё]+)$/i,
                        }
                    )}
                    helperText={errors.name ? "Enter a login from 3 to 20 in length" : false}
                />

                <TextField
                    error={errors.password ? true : false}
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    fullWidth
                    {...register("password",
                        {
                            required: true,
                            maxLength: {
                                value: 20,
                                message: 'Max length 20',
                            },
                            minLength: {
                                value: 3,
                                message: 'Min length 1'
                            }
                        }
                    )}
                    helperText={errors.password ? "Enter a password from 3 to 20 in length" : false}
                />
                {pathname !== '/autorise' ?
                    <TextField
                        error={errors.mail ? true : false}
                        id="outlined-mail-input"
                        label="Email"
                        type="email"
                        fullWidth
                        {...register("mail",
                            {
                                required: true,
                                pattern: /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/i,
                            }
                        )}
                        helperText={errors.mail ? "Incorrect e-mail" : false}
                    />
                    :
                    <></>
                }

                <Button
                    variant="contained"
                    color="info"
                    type="submit"
                >
                    Submit
                </Button>
            </form>
        </div>
    );
}

export default AuthForm;

