//en base a la forma del errorHandler: error.middleware.ts

export async function parseErrorResponse(salida: Response): Promise<string> {
    try {
      const cuerpo = await salida.json();
      if (cuerpo?.detalles?.length) {
            return cuerpo.detalles.map(
                (
                    detalle:{
                        campo: string;
                        mensaje: string
                    }
                ) => `${detalle.campo}: ${detalle.mensaje}`
            ).join(" | "); 
      }         
      if (cuerpo?.error) return cuerpo.error;
    } catch {
      // el body no era JSON parseable
    }
    return `Error en la solicitud (${salida.status})`;
}

