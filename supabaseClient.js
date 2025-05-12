// Importa a função de criação do client Supabase via CDN
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// Cria o client com a URL e a chave fornecidas
export const supabase = createClient(
  'https://rkqupiqbtngcyrdunuxc.supabase.co',
  'eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJrcXVwaXFidG5nY3lyZHVudXhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY1MzU2NTYsImV4cCI6MjA2MjExMTY1Nn0.FTIdlT2yLGvGnZUpx22jYnvRPLOE8n3MGZLddo27mNI'
)