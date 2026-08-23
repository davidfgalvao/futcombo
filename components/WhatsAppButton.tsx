import { whatsappLink } from "@/lib/format";

export function WhatsAppButton() {
  return (
    <a
      href={whatsappLink("Olá! Vim pelo site da FutCombo e quero atendimento.")}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-40 inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-full bg-whatsapp px-4 font-bold text-white shadow-lg transition-transform duration-200 hover:scale-[1.03]"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
        <path d="M20.5 3.5A11 11 0 0 0 2.1 17.2L1 23l6-1.6A11 11 0 0 0 20.5 3.5Zm-8.5 17a9 9 0 0 1-4.6-1.3l-.3-.2-3.5.9.9-3.4-.2-.4A9 9 0 1 1 12 20.5Zm5-6.7c-.3-.1-1.6-.8-1.8-.9s-.4-.1-.6.1-.7.9-.8 1-.3.2-.6.1a7.4 7.4 0 0 1-2.2-1.4 8.2 8.2 0 0 1-1.5-1.9c-.2-.3 0-.4.1-.6l.4-.5.1-.3c0-.1 0-.3 0-.4s-.6-1.5-.8-2-.4-.5-.6-.5h-.5c-.2 0-.4.1-.6.3a2 2 0 0 0-.6 1.5 3.5 3.5 0 0 0 .7 1.9 8 8 0 0 0 3.1 3 14 14 0 0 0 3.2 1.3 3 3 0 0 0 2 .2 2.5 2.5 0 0 0 1.7-1.1 2 2 0 0 0 .1-1.1c-.1-.1-.3-.2-.6-.3Z" />
      </svg>
      Fale conosco
    </a>
  );
}
