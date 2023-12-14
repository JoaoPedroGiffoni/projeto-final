export enum Status {
  success = 'success',
  error = 'error',
  fail = 'fail'
}

export interface Content {
  status: Status
  data?: Record<string, unknown>
  message?: string
}

export const url = (path: string) => (import.meta.env.FRONTEND_API_URL + path)
  .replace(/([^:]\/)\/+/g, "$1")

export const post = (path: string, data: Record<string, unknown>): Promise<Response> => {
  return fetch(
    url(path),
    {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(data)
    }
  )
}

const extractErrorMessage = (exception: unknown): string => {
  if (typeof exception === 'string') {
    return exception
  }
  if (exception instanceof Error) {
    return exception.message
  }
  return 'Unknown error'
}

function parseContent (response: Response, content: Content): Content {
  // se o status não estiver entre 200 e 299, lança um erro
  if (!response.ok) {
    // usando o conteúdo da resposta como mensagem de erro
    return {
      status: Status.error,
      message: content.message || 'Unknown error'
    }
  }
  // se não houver conteúdo, lança um erro
  if (!content.data) {
    // informando que não houve dados recebidos
    return {
      status: Status.error,
      message: 'No data received'
    }
  }
  // senão retorna o conteúdo
  return content
}

export const login = async (username: string, password: string): Promise<Content> => {
  // inicializa variáveis de resposta e conteúdo
  let response: Response
  let content: Content = { status: Status.error, message: 'Unknown error' }
  try {
    // faz a requisição
    response = await post('/api/v1/login', { username, password })
    // extrai o conteúdo da resposta como JSON
    content = await response.json()
  } catch (error) {
    // se houver um erro, retorna um Content de erro
    return {
      status: Status.error,
      message: extractErrorMessage(error)
    }
  }
  return parseContent(response, content)
}
