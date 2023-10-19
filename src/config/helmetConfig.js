import helmet from 'helmet'

// Configuración de Helmet e inserción de cabeceras
const helmetConfig = (app) => {
  app.use(helmet())
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'"],
        fontSrc: ["'self'"],

        frameSrc: ["'self'", 'http://localhost:4001/api-doc'],
        imgSrc: ["'self'"],
        sandbox: ['allow-forms', 'allow-scripts', 'allow-same-origin'],
        reportUri: '/report-violation',
        objectSrc: ["'none'"]
      }
    },
    strictTransportSecurity: {
      maxAge: 63072000, // 2 years
      includeSubDomains: true,
      preload: true
    },
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
    featurePolicy: {
      features: {
        fullscreen: ["'self'"],
        vibrate: ["'none'"],
        payment: ["'none'"]
      }
    },
    frameguard: { action: 'deny' },
    permittedCrossDomainPolicies: { permittedPolicies: 'none' },
    hidePoweredBy: true,
    noSniff: true,
    xssFilter: true,
    dnsPrefetchControl: true,
    expectCt: { enforce: true, maxAge: 86400 }
  }))
}

export default helmetConfig
