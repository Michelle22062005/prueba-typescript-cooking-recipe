import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer"

export async function POST(request: NextRequest) {
    console.log("SENDEMAIL HIT")
    try {
        const { name, email } = await request.json();
        console.log("DATOS RECIBIDOS:", name, email)
        const userMail = process.env.MAIL_USER;
        const passMail = process.env.MAIL_PASS;

        if (!name || !email) {
            return NextResponse.json(
                { error: "Falta datos rqueridos para enviar notificacion" },
                { status: 400 },
            );
        }
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: userMail,
                pass: passMail,
            },
        });
        const htmlContent = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bienvenida</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #fdf0e8;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      color: #6b4f3a;
    }
    .email-container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #fdf6f0;
      border-radius: 20px;
      border: 1px solid #f0d9cc;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(176, 120, 80, 0.1);
    }
    .header {
      background-color: #f7c5a0;
      padding: 32px 30px;
      text-align: center;
      border-bottom: 1px solid #f0d9cc;
    }
    .logo {
      font-size: 20px;
      font-weight: 900;
      color: #7a3e1e;
      letter-spacing: 3px;
      text-transform: uppercase;
    }
    .logo span {
      color: #c4a98a;
    }
    .header-sub {
      font-size: 11px;
      color: #b07850;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      margin-top: 6px;
    }
    .content {
      padding: 40px 36px;
    }
    .badge {
      display: inline-block;
      background-color: #f7c5a0;
      color: #7a3e1e;
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.2em;
      padding: 5px 14px;
      border-radius: 20px;
      margin-bottom: 16px;
    }
    h1 {
      font-size: 24px;
      font-weight: 800;
      color: #6b4f3a;
      margin: 0 0 16px 0;
      line-height: 1.3;
    }
    p {
      font-size: 14px;
      line-height: 1.7;
      color: #b07850;
      margin: 0 0 16px 0;
    }
    .user-box {
      background-color: #fff8f4;
      border-left: 4px solid #f7c5a0;
      padding: 18px 20px;
      margin: 24px 0;
      border-radius: 0 12px 12px 0;
    }
    .user-box-row {
      font-size: 13px;
      margin-bottom: 8px;
      color: #b07850;
    }
    .user-box-row:last-child {
      margin-bottom: 0;
    }
    .user-box-row strong {
      color: #6b4f3a;
    }
    .divider {
      border: none;
      border-top: 1px solid #f0d9cc;
      margin: 28px 0;
    }
    .btn-container {
      text-align: center;
      margin: 28px 0;
    }
    .btn {
      display: inline-block;
      background-color: #f7c5a0;
      color: #7a3e1e;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      font-size: 12px;
      padding: 14px 36px;
      border-radius: 12px;
      text-decoration: none;
    }
    .note {
      font-size: 12px;
      color: #c4a98a;
      text-align: center;
      margin: 0;
    }
    .footer {
      background-color: #fff8f4;
      padding: 20px 30px;
      text-align: center;
      font-size: 11px;
      color: #c4a98a;
      border-top: 1px solid #f0d9cc;
    }
    .footer a {
      color: #b07850;
      text-decoration: none;
    }
  </style>
</head>
<body>

  <div class="email-container">

    <!-- Header -->
    <div class="header">
      <div class="logo">GLAM<span>·</span>SHOP</div>
      <div class="header-sub">Tu tienda de maquillaje favorita</div>
    </div>

    <!-- Content -->
    <div class="content">
      <div class="badge">✨ Cuenta creada</div>
      <h1>¡Bienvenida, ${name}!</h1>

      <p>Nos alegra mucho que formes parte de nuestra comunidad. Tu cuenta ha sido creada exitosamente y ya puedes empezar a explorar todos nuestros productos.</p>

      <!-- User info box -->
      <div class="user-box">
        <div class="user-box-row"><strong>Nombre:</strong> ${name}</div>
        <div class="user-box-row"><strong>Correo:</strong> ${email}</div>
        <div class="user-box-row"><strong>Fecha de registro:</strong> ${new Date().toLocaleString("es-ES", {
            timeZone: "America/Bogota",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })}</div>
      </div>

      <hr class="divider" />

      <p style="text-align:center; color: #6b4f3a; font-weight: 600;">¿Lista para descubrir tus nuevos favoritos?</p>

      <div class="btn-container">
        <a href="https://tu-tienda.com/products" class="btn">Explorar productos</a>
      </div>

      <p class="note">Si no creaste esta cuenta, puedes ignorar este correo.</p>
    </div>

    <!-- Footer -->
    <div class="footer">
      &copy; 2026 GlamShop. Todos los derechos reservados.<br/>
      <a href="https://tu-tienda.com">tu-tienda.com</a>
    </div>

  </div>

</body>
</html>

             
        `;
        await transporter.sendMail({
            from: '"NuevaApp" <no-reply@nuevaapp.com>',
            to: email,
            subject: `Nuevo Usuario Registrado: ${email} `,
            html: htmlContent,
        });
        return NextResponse.json(
            { message: "Notificacion al admin enviada exitosamente" },
            { status: 200 },
        );
    } catch (error) {
        console.error("Error enviando notoficacion al admin", error);
        return NextResponse.json(
            { error: `Error al enviar notificacion ${error}` },
            { status: 500 },
        );
    }
}