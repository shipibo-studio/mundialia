#!/bin/bash

# Script para crear un nuevo usuario en Neon con hashing de contraseña
# Uso: ./scripts/create-user.sh email@example.com micontraseña

set -e

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Validar argumentos
if [ $# -lt 2 ]; then
  echo -e "${RED}❌ Uso: ./scripts/create-user.sh <email> <password>${NC}"
  echo ""
  echo "Ejemplo: ./scripts/create-user.sh usuario@example.com micontraseña123"
  exit 1
fi

EMAIL="$1"
PASSWORD="$2"

# Validar formato de email básico
if ! [[ "$EMAIL" =~ ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$ ]]; then
  echo -e "${RED}❌ Email inválido: $EMAIL${NC}"
  exit 1
fi

# Validar longitud de contraseña
if [ ${#PASSWORD} -lt 6 ]; then
  echo -e "${RED}❌ La contraseña debe tener al menos 6 caracteres${NC}"
  exit 1
fi

# Cargar variables desde .env
if [ ! -f .env ]; then
  echo -e "${RED}❌ Error: Archivo .env no encontrado${NC}"
  exit 1
fi

DATABASE_URL=$(grep "^DATABASE_URL=" .env | cut -d'=' -f2- | sed 's/"//g')

if [ -z "$DATABASE_URL" ]; then
  echo -e "${RED}❌ Error: DATABASE_URL no encontrado en .env${NC}"
  exit 1
fi

echo -e "${YELLOW}📝 Creando usuario...${NC}"
echo "Email: $EMAIL"

# Obtener ruta del proyecto
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

# Ejecutar el script TypeScript helper con tsx
cd "$PROJECT_DIR"
DATABASE_URL="$DATABASE_URL" npx tsx scripts/create-user-helper.ts "$EMAIL" "$PASSWORD"

echo -e "${GREEN}✨ Listo${NC}"
