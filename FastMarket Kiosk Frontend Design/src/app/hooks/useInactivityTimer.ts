import { useEffect, useRef, useCallback } from 'react';

interface UseInactivityTimerProps {
  onWarning: () => void;
  onTimeout: () => void;
  warningTime?: number; // tempo em ms para mostrar aviso (padrão: 2 minutos)
  timeoutTime?: number; // tempo em ms para timeout (padrão: 5 minutos)
}

export function useInactivityTimer({
  onWarning,
  onTimeout,
  warningTime = 120000, // 2 minutos
  timeoutTime = 300000, // 5 minutos
}: UseInactivityTimerProps) {
  const warningTimerRef = useRef<NodeJS.Timeout>();
  const timeoutTimerRef = useRef<NodeJS.Timeout>();

  const resetTimers = useCallback(() => {
    // Limpa timers existentes
    if (warningTimerRef.current) clearTimeout(warningTimerRef.current);
    if (timeoutTimerRef.current) clearTimeout(timeoutTimerRef.current);

    // Define novo timer de aviso
    warningTimerRef.current = setTimeout(() => {
      onWarning();
    }, warningTime);

    // Define novo timer de timeout
    timeoutTimerRef.current = setTimeout(() => {
      onTimeout();
    }, timeoutTime);
  }, [onWarning, onTimeout, warningTime, timeoutTime]);

  useEffect(() => {
    // Lista de eventos que indicam atividade do usuário
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];

    // Inicia os timers
    resetTimers();

    // Adiciona listeners para todos os eventos
    events.forEach((event) => {
      document.addEventListener(event, resetTimers);
    });

    // Cleanup
    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, resetTimers);
      });
      if (warningTimerRef.current) clearTimeout(warningTimerRef.current);
      if (timeoutTimerRef.current) clearTimeout(timeoutTimerRef.current);
    };
  }, [resetTimers]);

  return { resetTimers };
}
