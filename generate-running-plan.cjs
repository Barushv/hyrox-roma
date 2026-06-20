// node generate-running-plan.cjs
const fs = require('fs')

// ─── FC ZONES ─────────────────────────────────────────────────────────────────
const FC = {
  israel: { z1: '105–114 lpm', z2: '114–131 lpm', z3: '131–144 lpm', z4: '144–158 lpm', z5: '158–175 lpm' },
  andrea: { z1: '116–126 lpm', z2: '126–146 lpm', z3: '146–159 lpm', z4: '159–175 lpm', z5: '175–194 lpm' }
}

// ─── COLORS ───────────────────────────────────────────────────────────────────
const C = {
  z1: '#E8F5E9', z2: '#E6F1FB', z3: '#FFFDE7', z4: '#FFF3E0', z5: '#FFEBEE',
  fcIsrael: '#DBEAFE', fcAndrea: '#D1FAE5',
  rule: '#FCEBEB', instr: '#F8FAFC', neutral: '#FFFFFF',
  mob: '#E1F5EE', core: '#EEEDFE', gym: '#EAF3DE', sup: '#E6F1FB', ergs: '#FAEEDA',
  sep: '#F1F5F9'
}

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const sesion = (ejercicio, series, detalle) =>
  ({ bloque: 'Sesion', ejercicio, series, detalle, nota: '', highlight: false, color: C.neutral })
const estructura = detalle =>
  ({ bloque: 'Estructura', ejercicio: 'Desglose', series: '-', detalle, nota: '', highlight: false, color: C.instr })
const instr = detalle =>
  ({ bloque: 'Instruccion', ejercicio: detalle, series: '-', detalle: '', nota: '', highlight: false, color: C.instr })
const regla = (texto, nota = '') =>
  ({ bloque: 'Regla', ejercicio: texto, series: '-', detalle: nota, nota: '', highlight: true, color: C.rule })
const sep = label =>
  ({ bloque: '-----', ejercicio: `-- ${label} --`, series: '-', detalle: '', nota: '', highlight: false, color: C.sep })

function fcRow(iz, az, zona, desc) {
  return [
    { bloque: 'FC Israel', ejercicio: `${zona} - ${FC.israel[iz]}`, series: desc, detalle: 'Israel - 45 anos - FCmax 175', nota: '', highlight: false, color: C.fcIsrael },
    { bloque: 'FC Andrea', ejercicio: `${zona} - ${FC.andrea[az]}`, series: desc, detalle: 'Andrea - 26 anos - FCmax 194', nota: '', highlight: false, color: C.fcAndrea }
  ]
}

const gym = (bloque, ejercicio, series, detalle, nota = '', highlight = false, color = null) =>
  ({ bloque, ejercicio, series, detalle, nota, highlight, color: color || C.gym })
const sup = (ejercicio, series, detalle, nota = '', highlight = false) =>
  ({ bloque: 'Tren superior', ejercicio, series, detalle, nota, highlight, color: C.sup })
const erg = (ejercicio, series, detalle, nota = '') =>
  ({ bloque: 'ERGs', ejercicio, series, detalle, nota, highlight: false, color: C.ergs })
const core = (ejercicio, series, detalle) =>
  ({ bloque: 'Core', ejercicio, series, detalle, nota: '', highlight: false, color: C.core })
const mob = (ejercicio, series, detalle, nota = '') =>
  ({ bloque: 'Movilidad', ejercicio, series, detalle, nota, highlight: false, color: C.mob })
const foam = (ejercicio, series, detalle) =>
  ({ bloque: 'Foam roller', ejercicio, series, detalle, nota: '', highlight: false, color: C.mob })

// ─── GYM BLOCKS PER PHASE ─────────────────────────────────────────────────────

const lunesGym = {
  1: [
    sep('GYM - Tren inferior'),
    gym('Tren inferior', 'Sentadilla trasera', '4 x 6', '65-70% del maximo - descanso 2 min', 'Tecnica perfecta antes de subir carga'),
    gym('Tren inferior', 'Hip thrust', '3 x 10', 'Peso moderado - gluteo apretado en la cima', 'Motor del sled push - prioritario siempre', true),
    gym('Tren inferior', 'Bulgarian split squat', '3 x 8 c/lado', 'Mancuerna o barra - torso erguido'),
    gym('Tren inferior', 'Romanian deadlift', '3 x 8', 'Excentrico lento (bajar 3 seg) - isquios fuertes'),
    gym('Tren inferior', 'Walking lunge con mancuerna', '3 x 15m', 'Mancuernas al costado - paso largo', 'Simula sandbag lunge de competencia'),
    core('Plancha frontal', '3 x 45 seg', 'Cuerpo en linea - no hundir cadera'),
    core('Dead bug', '3 x 10 c/lado', 'Espalda baja pegada al suelo - movimiento lento')
  ],
  2: [
    sep('GYM - Tren inferior (carga alta)'),
    gym('Tren inferior', 'Sentadilla trasera', '5 x 5', '75-80% del maximo - descanso 2 min', 'Semana de fuerza maxima', true),
    gym('Tren inferior', 'Hip thrust', '4 x 10', 'Pausa 1 seg en la cima - mayor carga', '', true),
    gym('Tren inferior', 'Bulgarian split squat', '4 x 10 c/lado', 'Mas peso que Fase 1'),
    gym('Tren inferior', 'Romanian deadlift', '4 x 8', 'Aumentar rango de movimiento - carga alta'),
    gym('Tren inferior', 'Sandbag lunge', '3 x 50m', 'O walking lunge pesado - simula la estacion Hyrox', '', true),
    gym('Tren inferior', 'Box jump', '3 x 8', 'Caer suave - potencia explosiva'),
    core('Pallof press', '3 x 12 c/lado', 'Polea baja - resistir la rotacion'),
    core('Hollow body hold', '3 x 30 seg', 'Espalda baja pegada al suelo')
  ],
  3: [
    sep('GYM - Tren inferior (Hyrox especifico)'),
    gym('Tren inferior', 'Sentadilla frontal', '4 x 8', 'Barra o mancuernas - explosiva en la subida', 'Simula Wall Balls - misma mecanica', true),
    gym('Tren inferior', 'Hip thrust', '4 x 12', 'Velocidad - potencia - gluteo contraido'),
    gym('Tren inferior', 'Wall balls', '3 x 20', 'Pelota medicine 9 kg - target a 10 pies', 'Entrenamiento especifico Hyrox #5', true),
    gym('Tren inferior', 'Sandbag lunge', '3 x 50m', 'Hyrox especifico - sin pausa', '', true),
    gym('Tren inferior', 'Step up explosivo', '3 x 10 c/lado', 'Caja 60cm - subir rapido - bajar controlado'),
    core('Hanging knee raise', '3 x 12', 'Control total - no balancearse'),
    core('Ab wheel rollout', '3 x 10', 'Extension completa - volver lento')
  ],
  4: [
    sep('GYM - Tren inferior (taper)'),
    gym('Tren inferior', 'Sentadilla trasera', '3 x 6', '70% del maximo - mantener fuerza sin fatigar'),
    gym('Tren inferior', 'Hip thrust', '3 x 8', 'Peso normal - no forzar'),
    gym('Tren inferior', 'Bulgarian split squat', '2 x 8 c/lado', 'Peso reducido - foco en tecnica'),
    core('Plancha', '2 x 45 seg', 'Suave - solo activacion')
  ]
}

const martesGym = {
  1: [
    sep('GYM - Tren superior + ERGs'),
    sup('Remo con barra', '4 x 6', 'Espalda plana - codos cerca del cuerpo'),
    sup('Pull-ups o jalon al pecho', '3 x max', 'O 3 x 10 con asistencia'),
    sup('Press militar DB', '3 x 8', 'Peso controlado - core activo'),
    sup('Face pull con polea', '3 x 15', 'Salud de hombros - codos a altura del hombro'),
    sup('Farmer carry', '3 x 50m', 'Lo mas pesado posible - paso firme', 'Transferencia directa al Hyrox', true),
    erg('SkiErg', '3 x 500m', 'Descanso 90 seg - ritmo 2:05-2:10 /500m', 'Medir tiempo - referencia inicial'),
    erg('Remo', '2 x 500m', 'Descanso 2 min - ritmo 2:10-2:15 /500m')
  ],
  2: [
    sep('GYM - Tren superior + ERGs (mayor volumen)'),
    sup('Remo con barra', '5 x 5', 'Carga alta - espalda plana', '', true),
    sup('Pull-ups', '4 x max', 'Sin asistencia si es posible'),
    sup('Press militar DB', '4 x 8', '+Peso vs Fase 1'),
    sup('Face pull', '3 x 15', 'Salud de hombros - no saltar'),
    sup('Farmer carry', '4 x 50m', '+2.5 kg c/mano vs Fase 1', '', true),
    erg('SkiErg', '4 x 500m', 'Ritmo 2:00-2:05 /500m', 'Subir ritmo vs Fase 1'),
    erg('Remo', '3 x 500m', 'Ritmo 2:06-2:10 /500m')
  ],
  3: [
    sep('GYM - Tren superior + ERGs (race pace)'),
    sup('Remo con barra', '4 x 8', 'Explosivo en el tiron - Hyrox-especifico', '', true),
    sup('Pull-ups', '4 x max', 'Con peso adicional si es posible'),
    sup('Press militar KB', '3 x 8', 'Kettlebell - rango completo'),
    sup('Burpee broad jump', '3 x 10', 'Estacion Hyrox #8 - tecnica completa', 'Simulacro de la estacion final', true),
    sup('Farmer carry', '4 x 50m', 'Peso competencia - 32 kg/24 kg', '', true),
    erg('SkiErg', '2 x 1000m', 'Ritmo sostenido 2:05 /500m - registrar tiempo', ''),
    erg('Remo', '2 x 750m', 'Ritmo 2:05-2:08 /500m')
  ],
  4: [
    sep('GYM - Tren superior + ERGs (taper)'),
    sup('Remo con barra', '3 x 6', 'Peso reducido - solo mantener'),
    sup('Face pull', '2 x 15', 'Salud de hombros'),
    erg('SkiErg', '2 x 500m', 'Ritmo suave 2:10 /500m - activacion', 'No fatigar - mantener sensacion'),
    erg('Remo', '1 x 500m', 'Suave - solo mantener la tecnica')
  ]
}

const miercolesGym = [
  sep('MOVILIDAD Y RECUPERACION'),
  foam('Cuadriceps', '2 min c/lado', 'Rodar lento - parar en puntos de tension'),
  foam('Gluteos (figura 4)', '2 min c/lado', 'Cruzar pierna - presion sostenida'),
  foam('Espalda baja', '2 min', 'Suave - no en vertebras'),
  foam('Pantorrillas', '2 min c/lado', 'Rodar + rotar el pie'),
  mob('Pigeon pose', '45 seg c/lado', 'Cadera al suelo - respirar profundo', 'Clave para sled push'),
  mob('90/90 (cadera)', '45 seg c/lado', 'Rotar el torso sobre la pierna delantera'),
  mob('Hip flexor stretch', '45 seg c/lado', 'Rodilla en el suelo - cadera al frente'),
  mob('Movilidad tobillo (pared)', '10 rep c/lado', 'Rodilla toca la pared - talon en el suelo', 'Clave para postura sled push')
]

const domingoMob = [
  sep('RECUPERACION ACTIVA'),
  foam('Foam roller completo', '15-20 min', 'Cuadriceps - gluteos - espalda - pantorrillas'),
  mob('Caminata suave', '20-30 min', 'Opcional - paso normal - sin esfuerzo')
]

// ─── BUILD PHASE DAYS ─────────────────────────────────────────────────────────

function buildPhaseDays(phaseNum) {
  const runDays = phaseNum === 1 ? phase1Running() :
    phaseNum === 2 ? phase2Running() : phase3Running()

  return runDays.map((d, i) => {
    const exercises = [...d.exercises]
    if (i === 0) exercises.push(...lunesGym[phaseNum])
    else if (i === 1) exercises.push(...martesGym[phaseNum])
    else if (i === 2) exercises.push(...miercolesGym)
    else if (i === 6) exercises.push(...domingoMob)
    return { ...d, exercises }
  })
}

// ─── PHASE 1 RUNNING ──────────────────────────────────────────────────────────
function phase1Running() {
  return [
    {
      day: 'Lunes', sessionType: 'Z2 Continuo + Gym Tren Inferior', timeStr: '40 min running + gym',
      sessionAm: 'Carrera Z2', sessionPm: 'Gym - Tren inferior',
      exercises: [
        sep('RUNNING - Base aerobica'),
        regla('Si no puedes hablar con oraciones completas mientras corres, vas demasiado rapido', 'Bajar el ritmo sin dudar'),
        sesion('Z2 Continuo', '40 min - ~6 km', 'Pace conversacional constante. Terreno plano. Cada uno a su propia FC.'),
        ...fcRow('z2', 'z2', 'Z2', 'Base aerobica'),
        instr('Pueden ir a ritmos distintos - cada quien a su FC. Si sudas mucho desde el inicio, baja el pace.')
      ]
    },
    {
      day: 'Martes', sessionType: 'Fartlek Suave + Gym Tren Superior + ERGs', timeStr: '35 min running + gym',
      sessionAm: 'Fartlek Z2+Z4', sessionPm: 'Gym - Tren superior + ERGs',
      exercises: [
        sep('RUNNING - Fartlek'),
        sesion('Fartlek Suave', '35 min - ~5 km', '10 min calentamiento Z2 - 8 repeticiones - 1 min cooldown'),
        estructura('10 min Z2 calentamiento - 8 x (1 min VIVITO + 2 min FACIL) - 1 min cooldown'),
        { bloque: 'FC Israel - 1 min VIVITO', ejercicio: `Z4 - ${FC.israel.z4}`, series: '1 min intenso', detalle: 'Israel', nota: '', highlight: false, color: C.fcIsrael },
        { bloque: 'FC Andrea - 1 min VIVITO', ejercicio: `Z4 - ${FC.andrea.z4}`, series: '1 min intenso', detalle: 'Andrea', nota: '', highlight: false, color: C.fcAndrea },
        { bloque: 'FC Israel - 2 min FACIL', ejercicio: `Z1 - ${FC.israel.z1}`, series: '2 min recuperacion', detalle: 'Israel', nota: '', highlight: false, color: C.fcIsrael },
        { bloque: 'FC Andrea - 2 min FACIL', ejercicio: `Z1 - ${FC.andrea.z1}`, series: '2 min recuperacion', detalle: 'Andrea', nota: '', highlight: false, color: C.fcAndrea },
        instr('En los 2 min faciles pueden trotar muy suave o caminar. La FC debe bajar antes del siguiente vivito.')
      ]
    },
    {
      day: 'Miercoles', sessionType: 'Z1 Recuperacion + Tecnica + Movilidad', timeStr: '30 min running + movilidad',
      sessionAm: 'Recuperacion activa', sessionPm: 'Movilidad + foam roller',
      exercises: [
        sep('RUNNING - Recuperacion'),
        sesion('Z1 Recuperacion + Tecnica', '30 min - ~4 km', 'Ritmo muy suave. Cada 5 min: 30 seg cadencia alta 180 spm.'),
        ...fcRow('z1', 'z1', 'Z1', 'Recuperacion'),
        { bloque: 'Tecnica', ejercicio: 'Cadencia alta 180 spm', series: 'Cada 5 min - 30 seg', detalle: 'Pasos cortos y rapidos. Contar pasos en 15 seg x 4 = spm.', nota: 'Objetivo: 180 spm', highlight: true, color: C.z3 },
        instr('Dia de recuperacion. Si el cuerpo pide parar, camina.')
      ]
    },
    {
      day: 'Jueves', sessionType: 'Strides + Potencia', timeStr: '40 min - ~5 km',
      sessionAm: 'Strides de potencia', sessionPm: '',
      exercises: [
        sep('RUNNING - Strides'),
        sesion('Strides + Potencia', '40 min - ~5 km', '10 min Z2 - 10 x (20 seg sprint + 40 seg caminando) - 15 min Z2'),
        estructura('10 min Z2 calentamiento - 10 x (20 seg sprint + 40 seg caminando) - 15 min Z2 cierre'),
        { bloque: 'FC Israel - 20 seg sprint', ejercicio: `Z4-Z5 - ${FC.israel.z4}`, series: '20 seg', detalle: 'Israel - pace ~3:50-4:00/km', nota: '', highlight: false, color: C.fcIsrael },
        { bloque: 'FC Andrea - 20 seg sprint', ejercicio: `Z4-Z5 - ${FC.andrea.z4}`, series: '20 seg', detalle: 'Andrea - pace ~3:50-4:00/km', nota: '', highlight: false, color: C.fcAndrea },
        instr('Los 20 seg son pace ~3:50-4:00/km CONTROLADO, no al maximo. Reemplaza colinas en plano.')
      ]
    },
    {
      day: 'Viernes', sessionType: 'Tempo Progresivo', timeStr: '30 min - ~5 km',
      sessionAm: 'Tempo Z2 - Z3', sessionPm: 'Movilidad suave',
      exercises: [
        sep('RUNNING - Tempo'),
        sesion('Tempo Progresivo', '30 min - ~5 km', '10 min Z2 - 10 min Z3 - 10 min Z2'),
        estructura('10 min Z2 calentamiento - 10 min Z3 sostenido - 10 min Z2 cooldown'),
        { bloque: 'FC Israel - 10 min Z3', ejercicio: `Z3 - ${FC.israel.z3}`, series: '10 min tempo', detalle: 'Israel', nota: '', highlight: false, color: C.fcIsrael },
        { bloque: 'FC Andrea - 10 min Z3', ejercicio: `Z3 - ${FC.andrea.z3}`, series: '10 min tempo', detalle: 'Andrea', nota: '', highlight: false, color: C.fcAndrea },
        instr('No empujen el tramo Z3. Debe sentirse incomodo pero sostenible.'),
        sep('MOVILIDAD POST-RUNNING'),
        mob('Estiramiento isquios', '30 seg c/lado', 'Sentado - pierna extendida'),
        mob('Estiramiento cuadriceps', '30 seg c/lado', 'De pie - talon al gluteo'),
        mob('Hip flexor stretch', '30 seg c/lado', 'Rodilla en el suelo')
      ]
    },
    {
      day: 'Sabado', sessionType: 'Long Run + Cierre Negativo', timeStr: '50-60 min - ~8-9 km',
      sessionAm: 'Long Run con split negativo', sessionPm: '',
      exercises: [
        sep('RUNNING - Long Run'),
        sesion('Long Run + Cierre Negativo', '50-60 min - ~8-9 km', '50-55 min Z2 - ultimos 5 min Z3 (split negativo)'),
        estructura('50-55 min Z2 principal - ultimos 5 min subir a Z3'),
        { bloque: 'FC Israel - Z2', ejercicio: `Z2 - ${FC.israel.z2}`, series: '50-55 min', detalle: 'Israel', nota: '', highlight: false, color: C.fcIsrael },
        { bloque: 'FC Andrea - Z2', ejercicio: `Z2 - ${FC.andrea.z2}`, series: '50-55 min', detalle: 'Andrea', nota: '', highlight: false, color: C.fcAndrea },
        { bloque: 'FC Israel - Cierre Z3', ejercicio: `Z3 - ${FC.israel.z3}`, series: 'Ultimos 5 min', detalle: 'Israel', nota: '', highlight: true, color: C.fcIsrael },
        { bloque: 'FC Andrea - Cierre Z3', ejercicio: `Z3 - ${FC.andrea.z3}`, series: 'Ultimos 5 min', detalle: 'Andrea', nota: '', highlight: true, color: C.fcAndrea },
        instr('Split negativo = terminar mas rapido. Los ultimos 5 min suben un escalon de FC - no un sprint.')
      ]
    },
    {
      day: 'Domingo', sessionType: 'Descanso Activo', timeStr: 'Sin entrenar',
      sessionAm: '', sessionPm: '',
      exercises: [
        { bloque: 'Descanso', ejercicio: 'Sin entrenamiento', series: '-', detalle: 'Descanso completo o caminata 20 min muy suave.', nota: '', highlight: true, color: C.rule }
      ]
    }
  ]
}

// ─── PHASE 2 RUNNING ──────────────────────────────────────────────────────────
function phase2Running() {
  return [
    {
      day: 'Lunes', sessionType: 'Z2 Largo + Gym Tren Inferior', timeStr: '50 min running + gym',
      sessionAm: 'Base aerobica larga', sessionPm: 'Gym - Tren inferior (carga alta)',
      exercises: [
        sep('RUNNING - Base aerobica larga'),
        regla('En los intervalos, pace objetivo 4:20-4:30/km. Si FC se dispara a Z5, bajar a 4:40.', 'La FC manda sobre el reloj'),
        sesion('Z2 Largo', '50 min - ~7-8 km', 'Continuo en Z2. 10 min mas que Fase 1.'),
        ...fcRow('z2', 'z2', 'Z2', 'Base aerobica'),
        instr('Mantener conversacion fluida todo el tiempo.')
      ]
    },
    {
      day: 'Martes', sessionType: 'Intervalos 1K + Gym Tren Superior + ERGs', timeStr: '55 min running + gym',
      sessionAm: 'Intervalos al pace objetivo', sessionPm: 'Gym - Tren superior + ERGs',
      exercises: [
        sep('RUNNING - Intervalos 1K'),
        sesion('Intervalos 1K', '6 x 1 km a pace objetivo', '10 min Z2 - 6 x 1 km + 90 seg trote - 5 min cooldown'),
        estructura('10 min Z2 - 6 x (1 km a 4:20-4:30/km + 90 seg trotando) - 5 min cooldown'),
        { bloque: 'Pace objetivo', ejercicio: '4:20-4:30 min/km', series: 'Por cada km', detalle: 'Todos los 6 iguales', nota: 'Los 6 deben sentirse igual!', highlight: true, color: C.z4 },
        { bloque: 'FC Israel - en 1K', ejercicio: `Z4 - ${FC.israel.z4}`, series: 'Durante cada km', detalle: 'Israel - si supera Z4 en rep 4-5, bajar pace', nota: '', highlight: false, color: C.fcIsrael },
        { bloque: 'FC Andrea - en 1K', ejercicio: `Z4 - ${FC.andrea.z4}`, series: 'Durante cada km', detalle: 'Andrea - si supera Z4 en rep 4-5, bajar pace', nota: '', highlight: false, color: C.fcAndrea },
        instr('No salir rapido y morir al final. Los 6 intervalos deben sentirse iguales.')
      ]
    },
    {
      day: 'Miercoles', sessionType: 'Z1 Recuperacion + Movilidad', timeStr: '25-30 min running + movilidad',
      sessionAm: 'Recuperacion post-intervalos', sessionPm: 'Movilidad + foam roller',
      exercises: [
        sep('RUNNING - Recuperacion'),
        sesion('Z1 Recuperacion', '25-30 min - muy suave', 'Dia despues de intervalos.'),
        ...fcRow('z1', 'z1', 'Z1', 'Recuperacion'),
        instr('Puede ser caminata larga si el cuerpo lo pide. Los intervalos del martes son exigentes.')
      ]
    },
    {
      day: 'Jueves', sessionType: 'Strides + Tempo', timeStr: '~45 min',
      sessionAm: 'Fuerza de carrera + umbral', sessionPm: '',
      exercises: [
        sep('RUNNING - Strides + Tempo'),
        sesion('Strides + Tempo', '~45 min total', '20 min strides - 15 min tempo continuo Z3-Z4'),
        estructura('20 min strides: 10 x (20 seg sprint + 40 seg caminando) - 15 min tempo sostenido Z3-Z4'),
        { bloque: 'FC Israel - Tempo 15 min', ejercicio: `Z3-Z4 - ${FC.israel.z3} > ${FC.israel.z4}`, series: '15 min', detalle: 'Israel - pace ~4:45-5:00/km', nota: '', highlight: false, color: C.fcIsrael },
        { bloque: 'FC Andrea - Tempo 15 min', ejercicio: `Z3-Z4 - ${FC.andrea.z3} > ${FC.andrea.z4}`, series: '15 min', detalle: 'Andrea - pace ~4:45-5:00/km', nota: '', highlight: false, color: C.fcAndrea },
        instr('No descansen entre strides y tempo - ir directo.')
      ]
    },
    {
      day: 'Viernes', sessionType: 'Compromised Run', timeStr: '3 x (1K + estacion)',
      sessionAm: 'Especifico Hyrox', sessionPm: 'Movilidad',
      exercises: [
        sep('RUNNING - Compromised Run'),
        regla('Correr 1K e inmediatamente ejecutar una estacion Hyrox - sin pausa. Asi se gana tiempo en Hyrox.'),
        sesion('Compromised Run', '3 repeticiones', '3 x (1 km a 4:30-4:45/km - inmediato: estacion Hyrox)'),
        estructura('Rep 1: 1K + 20 Wall Balls - Rep 2: 1K + 50m Sandbag Lunge - Rep 3: 1K + 20 Farmers Carry (rotar c/semana)'),
        { bloque: 'FC Israel - en 1K', ejercicio: `Z4 - ${FC.israel.z4}`, series: 'Cada km', detalle: 'Israel - pace 4:30-4:45/km', nota: '', highlight: false, color: C.fcIsrael },
        { bloque: 'FC Andrea - en 1K', ejercicio: `Z4 - ${FC.andrea.z4}`, series: 'Cada km', detalle: 'Andrea - pace 4:30-4:45/km', nota: '', highlight: false, color: C.fcAndrea },
        instr('El objetivo no es el tiempo de la estacion sino retomar el pace de carrera inmediatamente.'),
        sep('MOVILIDAD POST-RUN'),
        mob('Estiramiento completo', '10 min', 'Isquios - cuadriceps - gemelos - cadera')
      ]
    },
    {
      day: 'Sabado', sessionType: 'Long Run + Cierre Z3', timeStr: '65-75 min - ~10-11 km',
      sessionAm: 'Long Run con cierre mas fuerte', sessionPm: '',
      exercises: [
        sep('RUNNING - Long Run Fase 2'),
        sesion('Long Run + Cierre Z3', '65-75 min - ~10-11 km', '60-65 min Z2 - ultimos 10 min en Z3'),
        estructura('60-65 min Z2 continuo - ultimos 10 min subir a Z3 sostenido'),
        { bloque: 'FC Israel - Z2', ejercicio: `Z2 - ${FC.israel.z2}`, series: '60-65 min', detalle: 'Israel', nota: '', highlight: false, color: C.fcIsrael },
        { bloque: 'FC Andrea - Z2', ejercicio: `Z2 - ${FC.andrea.z2}`, series: '60-65 min', detalle: 'Andrea', nota: '', highlight: false, color: C.fcAndrea },
        { bloque: 'FC Israel - Cierre Z3', ejercicio: `Z3 - ${FC.israel.z3}`, series: 'Ultimos 10 min', detalle: 'Israel - 10 min vs 5 min en Fase 1', nota: '', highlight: true, color: C.fcIsrael },
        { bloque: 'FC Andrea - Cierre Z3', ejercicio: `Z3 - ${FC.andrea.z3}`, series: 'Ultimos 10 min', detalle: 'Andrea - 10 min vs 5 min en Fase 1', nota: '', highlight: true, color: C.fcAndrea },
        instr('Cierre de 10 min (vs 5 en Fase 1). La progresion es la adaptacion.')
      ]
    },
    {
      day: 'Domingo', sessionType: 'Descanso', timeStr: 'Sin entrenar',
      sessionAm: '', sessionPm: '',
      exercises: [
        { bloque: 'Descanso', ejercicio: 'Sin entrenamiento', series: '-', detalle: 'Descanso completo. La Fase 2 es exigente - el domingo es sagrado.', nota: '', highlight: true, color: C.rule }
      ]
    }
  ]
}

// ─── PHASE 3 RUNNING ──────────────────────────────────────────────────────────
function phase3Running() {
  return [
    {
      day: 'Lunes', sessionType: 'Z2 Mantenimiento + Gym Tren Inferior', timeStr: '45 min running + gym',
      sessionAm: 'Base aerobica', sessionPm: 'Gym - Tren inferior Hyrox-especifico',
      exercises: [
        sep('RUNNING - Mantenimiento aerobico'),
        regla('Los dias duros son muy duros. Los dias faciles son muy faciles. No existe el termino medio.', 'La clave del metodo keniano'),
        sesion('Z2 Mantenimiento', '45 min - ~7 km', 'Mantener base entre sesiones duras.'),
        ...fcRow('z2', 'z2', 'Z2', 'Base aerobica'),
        instr('Dia facil. Recuperar del fin de semana. El martes es el dia mas importante de la fase.')
      ]
    },
    {
      day: 'Martes', sessionType: '4x4 VO2 Max + Gym Tren Superior + ERGs', timeStr: '50 min running + gym',
      sessionAm: 'VO2 max - sesion clave', sessionPm: 'Gym - Tren superior + ERGs race pace',
      exercises: [
        sep('RUNNING - 4x4 VO2 Max'),
        regla('Este protocolo genera mejoras de VO2 max 3x mayores que el estado estable. Sesion mas importante de la fase.'),
        sesion('4x4 VO2 Max', '4 x 4 min intenso + 3 min caminando', '10 min Z2 - 4 x (4 min intenso + 3 min caminando) - 5 min cooldown'),
        estructura('10 min Z2 - 4 x (4 min a 4:00-4:15/km + 3 min caminando) - 5 min cooldown'),
        { bloque: 'Pace objetivo', ejercicio: '4:00-4:15 min/km', series: 'Esfuerzo 9/10', detalle: 'Se siente muy duro. Es correcto.', nota: '', highlight: true, color: C.z4 },
        { bloque: 'FC Israel - 4 min', ejercicio: `Z4-Z5 - ${FC.israel.z4} > ${FC.israel.z5}`, series: '4 min c/bloque', detalle: 'Israel', nota: '', highlight: false, color: C.fcIsrael },
        { bloque: 'FC Andrea - 4 min', ejercicio: `Z4-Z5 - ${FC.andrea.z4} > ${FC.andrea.z5}`, series: '4 min c/bloque', detalle: 'Andrea', nota: '', highlight: false, color: C.fcAndrea },
        instr('Los 3 min caminando son parte del protocolo - no acortarlos.')
      ]
    },
    {
      day: 'Miercoles', sessionType: 'Z1 + Drills de Tecnica + Movilidad', timeStr: '40 min running + movilidad',
      sessionAm: 'Recuperacion + drills', sessionPm: 'Movilidad + foam roller',
      exercises: [
        sep('RUNNING - Recuperacion + Drills'),
        sesion('Z1 + Drills', '30 min Z1 - 10 min drills', '30 min Z1 suave - A-skips + High Knees + 6 x strides 60-80m'),
        ...fcRow('z1', 'z1', 'Z1', 'Recuperacion'),
        { bloque: 'Drills', ejercicio: 'A-skips + High Knees', series: '2 x 20m c/u', detalle: 'Activar mecanica de carrera', nota: '', highlight: false, color: C.z3 },
        { bloque: 'Drills', ejercicio: 'Strides cortos', series: '6 x 60-80m', detalle: 'Aceleracion progresiva, no al maximo', nota: '', highlight: false, color: C.z3 },
        instr('Mantener Z1 estricto en el trote. Los drills son tecnica, no cansancio.')
      ]
    },
    {
      day: 'Jueves', sessionType: 'Simulacion Hyrox Parcial', timeStr: '4 rondas completas',
      sessionAm: 'Especifico Hyrox', sessionPm: '',
      exercises: [
        sep('RUNNING - Simulacion Hyrox'),
        regla('Aprender a retomar el pace 4:30 inmediatamente despues de cada estacion. Para eso entrenamos.'),
        sesion('Simulacion Hyrox Parcial', '4 x (1K + estacion completa)', '4 rondas rotando estaciones'),
        estructura('Rep 1: 1K + Farmers Carry 100m - Rep 2: 1K + 30 Wall Balls - Rep 3: 1K + Sandbag Lunge 50m - Rep 4: 1K + Row 250m'),
        { bloque: 'FC Israel - en km', ejercicio: `Z4 - ${FC.israel.z4}`, series: 'Cada km', detalle: 'Israel - pace 4:30/km', nota: '', highlight: false, color: C.fcIsrael },
        { bloque: 'FC Andrea - en km', ejercicio: `Z4 - ${FC.andrea.z4}`, series: 'Cada km', detalle: 'Andrea - pace 4:30/km', nota: '', highlight: false, color: C.fcAndrea },
        instr('4 rondas completas. Cronometrar el tiempo total. Sesion mas especifica del plan.')
      ]
    },
    {
      day: 'Viernes', sessionType: 'Tempo Largo', timeStr: '35 min',
      sessionAm: 'Umbral sostenido', sessionPm: 'Movilidad',
      exercises: [
        sep('RUNNING - Tempo Largo'),
        sesion('Tempo Largo', '35 min total', '5 min Z2 - 25 min sostenido Z3-Z4 - 5 min Z1 cooldown'),
        { bloque: 'FC Israel - 25 min Z3-Z4', ejercicio: `Z3-Z4 - ${FC.israel.z3} > ${FC.israel.z4}`, series: '25 min', detalle: 'Israel - pace ~4:45-5:10/km', nota: '', highlight: false, color: C.fcIsrael },
        { bloque: 'FC Andrea - 25 min Z3-Z4', ejercicio: `Z3-Z4 - ${FC.andrea.z3} > ${FC.andrea.z4}`, series: '25 min', detalle: 'Andrea - pace ~4:45-5:10/km', nota: '', highlight: false, color: C.fcAndrea },
        instr('25 min sostenidos en Z3-Z4. Si no pueden mantener, bajar a Z3 bajo.'),
        sep('MOVILIDAD POST-RUN'),
        mob('Pigeon pose', '45 seg c/lado', 'Apertura de cadera post-running'),
        mob('Estiramiento isquios', '30 seg c/lado', 'Sentado - pierna extendida'),
        mob('Pantorrillas', '30 seg c/lado', 'Talon en el suelo - pared')
      ]
    },
    {
      day: 'Sabado', sessionType: 'Long Run + Cierre a Pace', timeStr: '75-80 min - ~12-13 km',
      sessionAm: 'Long run con cierre al pace de carrera', sessionPm: '',
      exercises: [
        sep('RUNNING - Long Run Fase 3'),
        sesion('Long Run + Cierre a Pace', '75-80 min - ~12-13 km', '60-65 min Z2 - ultimos 15 min a pace objetivo 4:45'),
        { bloque: 'FC Israel - Z2', ejercicio: `Z2 - ${FC.israel.z2}`, series: '60-65 min', detalle: 'Israel', nota: '', highlight: false, color: C.fcIsrael },
        { bloque: 'FC Andrea - Z2', ejercicio: `Z2 - ${FC.andrea.z2}`, series: '60-65 min', detalle: 'Andrea', nota: '', highlight: false, color: C.fcAndrea },
        { bloque: 'FC Israel - Cierre Pace', ejercicio: `Z3-Z4 - ${FC.israel.z3} > ${FC.israel.z4}`, series: 'Ultimos 15 min', detalle: 'Israel - el cierre mas largo del plan', nota: '', highlight: true, color: C.fcIsrael },
        { bloque: 'FC Andrea - Cierre Pace', ejercicio: `Z3-Z4 - ${FC.andrea.z3} > ${FC.andrea.z4}`, series: 'Ultimos 15 min', detalle: 'Andrea - el cierre mas largo del plan', nota: '', highlight: true, color: C.fcAndrea },
        instr('Los ultimos 15 min al pace de carrera simulan el final de Hyrox con piernas cargadas.')
      ]
    },
    {
      day: 'Domingo', sessionType: 'Descanso', timeStr: 'Sin entrenar',
      sessionAm: '', sessionPm: '',
      exercises: [
        { bloque: 'Descanso', ejercicio: 'Sin entrenamiento', series: '-', detalle: 'Descanso completo. La Fase 3 es la mas exigente - el domingo no es opcional.', nota: '', highlight: true, color: C.rule }
      ]
    }
  ]
}

// ─── PHASE 4 WEEK 13 ──────────────────────────────────────────────────────────
function phase4Week13() {
  return [
    {
      day: 'Lunes', sessionType: 'Taper - Z2 Reducido + Gym', timeStr: '35 min running + gym taper',
      sessionAm: 'Reduccion de volumen', sessionPm: 'Gym - Tren inferior (taper)',
      exercises: [
        sep('RUNNING - Taper'),
        regla('Menos kilometros, misma intensidad. El trabajo ya esta hecho.'),
        sesion('Z2 - 35 min', '35 min - ~5 km', 'Mantener la sensacion sin acumular fatiga.'),
        ...fcRow('z2', 'z2', 'Z2', 'Base aerobica'),
        ...lunesGym[4]
      ]
    },
    {
      day: 'Martes', sessionType: 'Taper - 4x1K + Gym', timeStr: '40 min running + gym taper',
      sessionAm: 'Intervalos taper', sessionPm: 'Gym - Tren superior + ERGs (taper)',
      exercises: [
        sep('RUNNING - Intervalos Taper'),
        sesion('4x1K Taper', '4 x 1 km', '10 min Z2 - 4 x (1 km a 4:20-4:30/km + 90 seg) - 5 min cooldown'),
        { bloque: 'FC Israel', ejercicio: `Z4 - ${FC.israel.z4}`, series: '4 km', detalle: 'Israel - misma intensidad, menos volumen', nota: '', highlight: false, color: C.fcIsrael },
        { bloque: 'FC Andrea', ejercicio: `Z4 - ${FC.andrea.z4}`, series: '4 km', detalle: 'Andrea - misma intensidad, menos volumen', nota: '', highlight: false, color: C.fcAndrea },
        instr('4 km en vez de 6. Misma velocidad para mantener el sistema activo.'),
        ...martesGym[4]
      ]
    },
    {
      day: 'Miercoles', sessionType: 'Taper - Z1 Suave + Movilidad', timeStr: '20 min running + movilidad',
      sessionAm: 'Recuperacion taper', sessionPm: 'Movilidad + foam roller',
      exercises: [
        sep('RUNNING - Taper suave'),
        sesion('Z1 Suave', '20 min - muy facil', 'Solo mantener circulacion. Sin esfuerzo.'),
        ...fcRow('z1', 'z1', 'Z1', 'Recuperacion'),
        instr('20 min. Nada mas. Puede ser caminata rapida.'),
        ...miercolesGym
      ]
    },
    {
      day: 'Jueves', sessionType: 'Taper - Compromised Run Ligero', timeStr: '2x1K + 1 estacion',
      sessionAm: 'Hyrox especifico taper', sessionPm: '',
      exercises: [
        sep('RUNNING - Compromised Run Taper'),
        sesion('Compromised Run Taper', '2 x (1K + 1 estacion)', 'Version ligera: 2 en vez de 3 rondas.'),
        estructura('2 x (1 km a 4:30/km + 1 estacion a eleccion)'),
        { bloque: 'FC Israel', ejercicio: `Z4 - ${FC.israel.z4}`, series: '2 km', detalle: 'Israel', nota: '', highlight: false, color: C.fcIsrael },
        { bloque: 'FC Andrea', ejercicio: `Z4 - ${FC.andrea.z4}`, series: '2 km', detalle: 'Andrea', nota: '', highlight: false, color: C.fcAndrea },
        instr('Mantener la sensacion especifica sin fatiga. Llegar activos pero frescos.')
      ]
    },
    {
      day: 'Viernes', sessionType: 'Taper - Z1 + Strides', timeStr: '20 min + 4 strides',
      sessionAm: 'Activacion suave', sessionPm: 'Movilidad',
      exercises: [
        sep('RUNNING - Activacion Taper'),
        sesion('Z1 + Strides', '20 min Z1 + 4 x strides 60m', 'Mantener piernas agiles. No acumular.'),
        ...fcRow('z1', 'z1', 'Z1', 'Activacion suave'),
        { bloque: 'Strides', ejercicio: '4 x 60m progresivos', series: '60m', detalle: 'Llegar al 80% del maximo. No al tope.', nota: '', highlight: false, color: C.z3 },
        instr('Los strides activan el sistema nervioso sin cansar.'),
        sep('MOVILIDAD'),
        mob('Estiramiento suave completo', '15 min', 'Isquios - cadera - gemelos')
      ]
    },
    {
      day: 'Sabado', sessionType: 'Taper - Long Run Corto', timeStr: '45 min Z2',
      sessionAm: 'Long run taper', sessionPm: '',
      exercises: [
        sep('RUNNING - Long Run Taper'),
        sesion('Long Run Corto', '45 min Z2 - ~6-7 km', 'Sin cierre intenso. Llegar fresco a la semana de carrera.'),
        ...fcRow('z2', 'z2', 'Z2', 'Base aerobica'),
        instr('45 min suave. Sin cierre. Sin gym despues.')
      ]
    },
    {
      day: 'Domingo', sessionType: 'Descanso', timeStr: 'Sin entrenar',
      sessionAm: '', sessionPm: '',
      exercises: [
        { bloque: 'Descanso', ejercicio: 'Sin entrenamiento', series: '-', detalle: 'Descanso completo.', nota: '', highlight: true, color: C.rule },
        ...domingoMob
      ]
    }
  ]
}

// ─── PHASE 4 WEEK 14 ──────────────────────────────────────────────────────────
function phase4Week14() {
  return [
    {
      day: 'Lunes', sessionType: 'Race Week - Z1-Z2 Suave', timeStr: '20-25 min',
      sessionAm: 'Activacion minima', sessionPm: '',
      exercises: [
        regla('Semana de carrera. Solo correr 2-3 veces suave 20-25 min. Hidratacion. Sueno 8+ horas. Carbohidratos.'),
        sesion('Z1-Z2 Suave', '20-25 min - muy facil', 'Nada mas. Mantener circulacion.'),
        ...fcRow('z1', 'z1', 'Z1-Z2', 'Activacion minima'),
        instr('NO gym esta semana. No intentar hacer nada extra. El entrenamiento ya esta hecho.')
      ]
    },
    {
      day: 'Martes', sessionType: 'Race Week - Z1-Z2 Suave', timeStr: '20-25 min',
      sessionAm: 'Activacion minima', sessionPm: '',
      exercises: [
        sesion('Z1-Z2 Suave', '20-25 min - muy facil', 'Igual que el lunes. Solo circular.'),
        ...fcRow('z1', 'z1', 'Z1-Z2', 'Activacion minima'),
        instr('Comida: aumentar carbohidratos hoy y manana. Dormir 8+ horas.')
      ]
    },
    {
      day: 'Miercoles', sessionType: 'Race Week - Z1-Z2 Suave', timeStr: '20-25 min',
      sessionAm: 'Ultima carrera suave', sessionPm: '',
      exercises: [
        sesion('Z1-Z2 Suave', '20-25 min - muy facil', 'Ultima carrera antes de los strides del jueves.'),
        ...fcRow('z1', 'z1', 'Z1-Z2', 'Activacion minima'),
        instr('Preparar equipo de carrera. Revisar logistica del evento.')
      ]
    },
    {
      day: 'Jueves', sessionType: 'Race Week - Activacion Final', timeStr: '15 min + 4 strides',
      sessionAm: 'Activacion con strides', sessionPm: '',
      exercises: [
        sesion('Activacion Final', '15 min muy suave + 4 strides de 60m', 'Activar las piernas para la carrera del domingo.'),
        ...fcRow('z1', 'z1', 'Z1', 'Muy suave'),
        { bloque: 'Strides', ejercicio: '4 x 60m', series: 'Para activar piernas', detalle: 'Progresivos hasta el 80%. Sentir el pace de carrera.', nota: '', highlight: true, color: C.z3 },
        instr('Estos strides son los ultimos del plan.')
      ]
    },
    {
      day: 'Viernes', sessionType: 'Race Week - Descanso', timeStr: 'Sin entrenar',
      sessionAm: '', sessionPm: '',
      exercises: [
        regla('Descanso. Hidratacion. Sueno 8+ horas. Carbohidratos.'),
        { bloque: 'Protocolo', ejercicio: 'Hidratacion', series: '2.5-3 L agua', detalle: 'Electrolitos incluidos', nota: '', highlight: false, color: C.z2 },
        { bloque: 'Protocolo', ejercicio: 'Sueno', series: '8+ horas', detalle: 'La recuperacion mas importante', nota: '', highlight: false, color: C.z1 },
        { bloque: 'Protocolo', ejercicio: 'Carbohidratos', series: 'Cena con pasta/arroz', detalle: 'Carga de glucogeno', nota: '', highlight: false, color: C.z3 }
      ]
    },
    {
      day: 'Sabado', sessionType: 'Race Week - Descanso pre-carrera', timeStr: 'Sin entrenar',
      sessionAm: '', sessionPm: '',
      exercises: [
        regla('Ultimo dia antes de la carrera. Descanso total.'),
        { bloque: 'Protocolo', ejercicio: 'Descanso completo', series: '-', detalle: 'No correr. No gym. Solo caminar suave.', nota: '', highlight: false, color: C.z1 },
        { bloque: 'Protocolo', ejercicio: 'Desayuno race day', series: 'Preparar', detalle: 'Carbohidratos de facil digestion. Nada nuevo.', nota: '', highlight: true, color: C.z3 }
      ]
    },
    {
      day: 'Domingo', sessionType: 'HYROX ITALIA', timeStr: 'Race Day',
      sessionAm: 'HYROX ITALIA', sessionPm: '',
      exercises: [
        { bloque: 'CARRERA', ejercicio: 'HYROX ITALIA', series: 'Race Day', detalle: 'Pace objetivo: 4:30-4:50 min/km - 8 runs - 8 estaciones', nota: '100 dias de trabajo. Confiar en el proceso.', highlight: true, color: '#FEF9C3' },
        { bloque: 'Estrategia', ejercicio: 'Primeros 4 runs conservadores', series: 'Splits negativos', detalle: 'Del run 5 al 8 empujar. No salir al tope.', nota: '', highlight: false, color: C.z3 },
        { bloque: 'Estrategia', ejercicio: 'FC objetivo en runs', series: 'Z4 sostenido', detalle: `Israel: ${FC.israel.z4} - Andrea: ${FC.andrea.z4}`, nota: '', highlight: false, color: C.fcIsrael },
        { bloque: 'Estrategia', ejercicio: 'Retomar pace post-estacion', series: 'Inmediato', detalle: 'Para eso entrenamos los compromised runs. Sale automatico.', nota: '', highlight: false, color: C.instr }
      ]
    }
  ]
}

// ─── BUILD WEEKS ──────────────────────────────────────────────────────────────
function buildWeeks() {
  const weeks = []
  const phaseDefs = [
    { phase: 1, color: '#185FA5', count: 4, title: 'Base Aerobica', focus: 'Z2 largo - tecnica - tren inferior - ERGs base' },
    { phase: 2, color: '#3B6D11', count: 4, title: 'Construccion de Velocidad', focus: 'Intervalos 1K - compromised runs - umbral - carga gym alta' },
    { phase: 3, color: '#993C1D', count: 4, title: 'Race Pace & Simulacion', focus: 'VO2 max - simulacion Hyrox - tempo largo - gym Hyrox-especifico' },
    { phase: 4, color: '#534AB7', count: 2, title: 'Taper', focus: 'Reducir volumen - mantener intensidad - llegar frescos' }
  ]
  let weekNum = 1
  for (const p of phaseDefs) {
    for (let w = 0; w < p.count; w++) {
      let days
      if (p.phase < 4) days = buildPhaseDays(p.phase)
      else if (w === 0) days = phase4Week13()
      else days = phase4Week14()
      weeks.push({ week: weekNum, title: `Fase ${p.phase} - ${p.title}`, focus: p.focus, phase: p.phase, phaseColor: p.color, days })
      weekNum++
    }
  }
  return weeks
}

// ─── FULL PLAN ────────────────────────────────────────────────────────────────
const plan = {
  meta: {
    title: 'Plan Running 100 Dias - Hyrox Italia',
    subtitle: 'Israel & Andrea - Pace objetivo 4:30-4:50 min/km - Hyrox Italia',
    startDate: '2026-06-15',
    totalWeeks: 14,
    goal: '4:30-4:50 min/km sostenido',
    profiles: ['Israel', 'Andrea']
  },
  zones: [
    { name: 'Z1 - Recuperacion',    pace: 'Muy suave',     fc: `Israel: ${FC.israel.z1} - Andrea: ${FC.andrea.z1}`, uso: 'Dias de recuperacion activa', color: C.z1 },
    { name: 'Z2 - Base Aerobica',   pace: '5:30-6:30 /km', fc: `Israel: ${FC.israel.z2} - Andrea: ${FC.andrea.z2}`, uso: 'Long runs - dias base - mayoria del volumen', color: C.z2 },
    { name: 'Z3 - Tempo Suave',     pace: '5:00-5:30 /km', fc: `Israel: ${FC.israel.z3} - Andrea: ${FC.andrea.z3}`, uso: 'Cierres negativos - tempo F1', color: C.z3 },
    { name: 'Z4 - Umbral / Vivito', pace: '4:20-4:50 /km', fc: `Israel: ${FC.israel.z4} - Andrea: ${FC.andrea.z4}`, uso: 'Intervalos 1K - compromised runs - fartlek', color: C.z4 },
    { name: 'Z5 - VO2 Max',         pace: '3:50-4:15 /km', fc: `Israel: ${FC.israel.z5} - Andrea: ${FC.andrea.z5}`, uso: 'Protocolo 4x4 - strides de potencia', color: C.z5 }
  ],
  tests: [
    { id: 'skierg_1000',     name: 'SkiErg 1000m',               unit: 'min:seg',     objetivo: '< 4:00' },
    { id: 'remo_1000',       name: 'Remo 1000m',                 unit: 'min:seg',     objetivo: '< 4:15' },
    { id: 'pace_1km',        name: 'Pace 1km en fresco',         unit: 'min:seg /km', objetivo: '< 4:15 (Israel) / < 4:00 (Andrea)' },
    { id: 'pace_z2',         name: 'Pace Z2 comodo',             unit: 'min:seg /km', objetivo: '< 5:30 (Israel) / < 5:10 (Andrea)' },
    { id: 'cadencia',        name: 'Cadencia (pasos/min)',        unit: 'spm',         objetivo: '178-182 spm' },
    { id: 'long_run_pace',   name: 'Pace promedio Long Run',      unit: 'min:seg /km', objetivo: '< 5:45 (Israel) / < 5:20 (Andrea)' },
    { id: 'compromised_1k',  name: 'Pace post-estacion (1K)',     unit: 'min:seg /km', objetivo: '< 5:10 (Israel) / < 4:50 (Andrea)' },
    { id: 'wallballs_30',    name: 'Wall Balls x 30 (tiempo)',    unit: 'min:seg',     objetivo: '< 2:00' },
    { id: 'farmer_100m',     name: 'Farmer Carry 100m (tiempo)', unit: 'min:seg',     objetivo: '< 1:00' },
    { id: 'simulacro_total', name: 'Simulacro Hyrox total',       unit: 'h:mm',        objetivo: '< 1:15 (Israel) / < 1:10 (Andrea)' }
  ],
  weeks: buildWeeks()
}

// ─── WRITE FILES ──────────────────────────────────────────────────────────────
const json = JSON.stringify(plan, null, 2)
fs.writeFileSync('./public/hyrox_plan_data.json', json)
fs.writeFileSync('../hyrox_plan_data.json', json)

const totalEx = plan.weeks.reduce((a, w) => a + w.days.reduce((b, d) => b + d.exercises.length, 0), 0)
console.log(`Plan generado: ${plan.weeks.length} semanas - ${totalEx} ejercicios totales`)
console.log(`Running + Gym + FC en cada dia relevante`)
console.log(`startDate: ${plan.meta.startDate} - totalWeeks: ${plan.meta.totalWeeks}`)
