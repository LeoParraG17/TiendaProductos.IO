fetch('data/datos.json')
    .then(response => response.json())
    .then(data => {
        document.getElementById('titulo_producto').innerHTML = data.titulo_pagina;

        document.getElementById('datos_tienda').innerHTML = `
            <p>Nombre: ${data.datos_tienda.nombre}</p>
            <p>Correo: ${data.datos_tienda.correo}</p>
            <p>Teléfono: ${data.datos_tienda.telefono}</p>
            <p>Dirección: ${data.datos_tienda.direccion}</p>
        `;

        document.getElementById('horario_atencion').innerHTML = `
            <p>Lunes a Viernes: ${data.datos_tienda.horario_atencion.lunes_a_viernes}</p>
            <p>Sábados: ${data.datos_tienda.horario_atencion.sabados}</p>
            <p>Domingos: ${data.datos_tienda.horario_atencion.domingos}</p>
        `;

        
        const tablaProductos = document.getElementById('tabla_productos');
        let productosHTML = `
            <thead>
                <tr>
                    <th>Imagen</th>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Reseñas</th>
                </tr>
            </thead>
            <tbody>
        `;
        data.productos.forEach(producto => {
            let reseñasHTML = '';
            if (producto.reseñas && producto.reseñas.length > 0) {
                reseñasHTML = '<ul>';
                producto.reseñas.forEach(reseña => {
                    reseñasHTML += `
                        <li>
                            <strong>${reseña.usuario}:</strong> ${reseña.comentario} (Calificación: ${reseña.calificacion}, Fecha: ${reseña.fecha})
                        </li>
                    `;
                });
                reseñasHTML += '</ul>';
            } else {
                reseñasHTML = 'No hay reseñas para este producto.';
            }

            productosHTML += `
                <tr>
                    <td><img src="${producto.imagenes[0]}" width="100" alt="${producto.nombre}"></td>
                    <td>${producto.nombre}</td>
                    <td>${producto.descripcion}</td>
                    <td>${reseñasHTML}</td>
                </tr>
            `;
        });
        productosHTML += '</tbody>';
        tablaProductos.innerHTML = productosHTML;

        
        const tablaReseñas = document.getElementById('tabla_reseñas');
        let reseñasHTML = `
            <thead>
                <tr>
                    <th>Producto</th>
                    <th>Comentario</th>
                    <th>Calificación</th>
                    <th>Usuario</th>
                </tr>
            </thead>
            <tbody>
        `;
        data.reseñas_destacadas.forEach(reseña => {
            reseñasHTML += `
                <tr>
                    <td>${reseña.producto}</td>
                    <td>${reseña.comentario}</td>
                    <td>${reseña.calificacion}</td>
                    <td>${reseña.usuario}</td>
                </tr>
            `;
        });
        reseñasHTML += '</tbody>';
        tablaReseñas.innerHTML = reseñasHTML;
    })
    .catch(error => console.error('Error fetching data:', error));
