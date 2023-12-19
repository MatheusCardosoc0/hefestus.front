"use client"

import { useForm } from 'react-hook-form'
import { TextFiled } from '../Inputs'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import useSubmitDataPostOrPut from '@/hooks/api/useSubmitDataPostOrPut'

const schema = z.object({
  username: z.string()
    .min(3, "Deve ter no minimo 3 caracteres")
    .max(20, "Deve ter no máximo 20 caracteres"),
  password: z.string()
    .min(4, "Deve ter no minimo 4 caracteres")
})

type FormLoginData = z.infer<typeof schema>

const LoginBox = () => {

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormLoginData>({
    resolver: zodResolver(schema)
  })

  const onSubmit = (data: FormLoginData) => {

    const transformData = {
      ...data,
      userName: data.username.toUpperCase()
    }

    OnSubmit({
      data: transformData
    })
  }

  const OnSubmit = useSubmitDataPostOrPut({
    urlApi: '/api/auth',
    urlReturn: '/Dashboard'
  })

  return (
    <div
      className='
        bg-white
        p-4
        rounded-lg
        drop-shadow-[0px_0px_2px_#00000052]
        flex
        flex-col
        gap-8
      '
    >
      <span>
        <h2
          className='
          text-xl
          font-bold
        '
        >
          Seja bem vindo ao ERP Hefestus
        </h2>
        <p
          className='text-md'
        >
          Faça seu login...
        </p>
      </span>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='
          flex
          flex-col
          gap-6
        '
      >
        <TextFiled
          id='username'
          label='Usuário:'
          register={register}
          error={errors.username?.message}
          isUppercase
        />
        <TextFiled
          id='password'
          label='Senha:'
          register={register}
          error={errors.password?.message}
          type='password'
        />
        <button
          type='submit'
          className='
            p-2
            bg-blue-400
            text-white
            font-bold
            text-md
            hover:bg-blue-500
            w-full
            mt-4
          '
        >
          Entrar
        </button>
      </form>
    </div>
  )
}

export default LoginBox