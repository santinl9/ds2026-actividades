import { contactoSchema, type ContactoValidado } from '../types/schemas/ContactoSchema';
import {useForm} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';

function ContactoForm(){
    const {register, handleSubmit, reset, formState :{errors} }= useForm<ContactoValidado>({resolver: zodResolver(contactoSchema)});

    const [enviar, setEnviar]=useState<number>(0);

    const onSubmit= (data: ContactoValidado)=>{
        setEnviar(1)
        setTimeout(()=>{
            console.log(data);
            setEnviar(2);
            setTimeout(() =>{ setEnviar(0); reset()}, 3000)
        }, 2000)
        
    }

    return(
        <>
            <div className="fondo">

                <h1 className="titulo justify-center text-center">Contactate</h1>

                <div className="container mx-auto max-w-xl mt-4 px-4">
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className="mb-4">
                            <label htmlFor="nombre" className="etiqueta">Nombre</label>
                            <input
                                {...register("nombre")}
                                type="text"
                                id="nombre"
                                className="w-full campo"
                            />
                            {errors.nombre && (
                                <p className="text-[#DC3545] text-sm mt-1">{errors.nombre.message}</p>
                            )}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="email" className="etiqueta">Email</label>
                            <input
                                {...register("email")}
                                type="email"
                                id="email"
                                className="w-full campo"
                            />
                            {errors.email && (
                                <p className="text-[#DC3545] text-sm mt-1">{errors.email.message}</p>
                            )}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="asunto" className="etiqueta">Asunto</label>
                            <select
                                {...register("asunto")}
                                id="asunto"
                                className="w-full campo"
                            >
                                <option value="">Seleccioná una opción</option>
                                <option value="Consulta">Consulta</option>
                                <option value="Reclamo">Reclamo</option>
                                <option value="Sugerencia">Sugerencia</option>
                            </select>
                            {errors.asunto && (
                                <p className="text-[#DC3545] text-sm mt-1">{errors.asunto.message}</p>
                            )}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="mensaje" className="etiqueta">Mensaje</label>
                            <textarea
                                {...register("mensaje")}
                                id="mensaje"
                                rows={4}
                                className="w-full resize-none campo"
                            />
                            {errors.mensaje && (
                                <p className="text-[#DC3545] text-sm mt-1">{errors.mensaje.message}</p>
                            )}
                        </div>

                        {(enviar==0) && 
                            <button type="submit" className="boton">
                                Enviar
                            </button>
                        }

                        {(enviar==1) && 
                            <button 
                                type="button"
                                disabled
                                className="boton flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <div className="h-5 w-5 animate-spin rounded-full border-4 border-gray-300 border-t-red-600"></div>
                            </button>
                        }

                        {(enviar==2) && 
                            <button 
                                type="button"
                                disabled
                                className="boton disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Enviado con éxito
                            </button>
                        }

                    </form>
                </div>
            </div>
        </>
    )
}

export default ContactoForm
