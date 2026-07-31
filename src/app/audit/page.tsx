import { AuditForm } from "@/components/forms/AuditForm";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Audit gratuit : votre site et votre visibilité locale",
  description:
    "Demandez votre diagnostic gratuit : analyse humaine de votre site, votre fiche Google et votre visibilité locale, priorités concrètes sous 48 h.",
  path: "/audit",
});

const promises = [
  {
    title: "Une analyse humaine",
    body: "Pas un score généré automatiquement : un membre de l'équipe regarde réellement votre site, votre fiche Google et vos concurrents locaux.",
  },
  {
    title: "Des priorités, pas un catalogue",
    body: "Vous recevez trois à cinq actions classées par impact — dont certaines que vous pourrez faire vous-même, gratuitement.",
  },
  {
    title: "Aucune obligation",
    body: "Le diagnostic vous appartient. Pas de démarchage téléphonique, pas de relances automatiques : si vous voulez la suite, c'est vous qui revenez.",
  },
];

export default function AuditPage() {
  return (
    <section className="py-10 sm:py-16">
      <Container>
        <Breadcrumbs
          items={[
            { name: "Accueil", path: "/" },
            { name: "Audit gratuit", path: "/audit" },
          ]}
        />
        <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <Eyebrow>Diagnostic gratuit</Eyebrow>
            <h1 className="text-display-xl mt-4">
              Où en est vraiment votre présence en ligne ?
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">
              Cinq minutes de formulaire, 48 h ouvrées d&apos;attente, et une
              réponse honnête : ce qui fonctionne, ce qui vous coûte des
              clients, et par quoi commencer.
            </p>
            <ul className="mt-9 space-y-6">
              {promises.map((p) => (
                <li key={p.title} className="border-l-2 border-rose pl-5">
                  <h2 className="font-semibold">{p.title}</h2>
                  <p className="mt-1 text-[0.95rem] leading-relaxed text-ink-soft">
                    {p.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <AuditForm />
        </div>
      </Container>
    </section>
  );
}
