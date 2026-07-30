import type { ReactNode } from "react";
import Link from "next/link";

/**
 * Articles du blog, en dur et typés (pas de CMS au lancement — décision
 * documentée dans le blueprint). Chaque article répond à une vraie question
 * de fleuriste et apporte un angle propre au studio (information gain),
 * sans chiffre inventé ni promesse de classement.
 */

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  datePublished: string;
  dateModified: string;
  readingMinutes: number;
  authorName: string;
  body: ReactNode;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "site-internet-fleuriste-checklist",
    title: "Que doit contenir le site d'un fleuriste ? La checklist complète",
    description:
      "Pages, contenus, fonctions de commande, visibilité locale : la checklist complète d'un site de fleuriste qui travaille, par l'équipe de la plateforme Bloomy.",
    datePublished: "2026-07-10",
    dateModified: "2026-07-24",
    readingMinutes: 8,
    authorName: "L'équipe Bloomy Studio",
    body: (
      <>
        <p>
          Nous avons passé deux ans à construire{" "}
          <a href="https://bloomy.one">Bloomy</a>, une plateforme de commande
          florale, aux côtés de fleuristes indépendants. En chemin, nous avons
          vu des dizaines de sites de fleuristes — des bons, des datés, des
          absents. Voici, concrètement, ce qu&apos;un site de fleuriste doit
          contenir pour travailler à votre place pendant que vous composez au
          comptoir.
        </p>

        <h2>1. Les informations que tout le monde cherche — en premier</h2>
        <p>
          La majorité de vos visiteurs arrivent depuis Google, souvent depuis
          votre fiche Google Business Profile, presque toujours sur téléphone.
          Ils veulent trois choses, dans cet ordre :
        </p>
        <ul>
          <li>
            <strong>Vos horaires du jour</strong> — y compris jours fériés et
            fermetures exceptionnelles. Un client qui se déplace pour rien ne
            revient pas.
          </li>
          <li>
            <strong>Votre adresse et l&apos;itinéraire</strong> — un lien direct
            vers Google Maps, pas une carte décorative.
          </li>
          <li>
            <strong>Un moyen de commander ou d&apos;appeler</strong> — bouton
            d&apos;appel cliquable, commande en ligne si vous la proposez.
          </li>
        </ul>
        <p>
          Ces trois éléments doivent être accessibles en deux gestes depuis
          n&apos;importe quelle page. Tout le reste du site est secondaire par
          rapport à ça.
        </p>

        <h2>2. Une page par service — pas une page « prestations »</h2>
        <p>
          C&apos;est l&apos;erreur la plus fréquente et la plus coûteuse. Un
          fleuriste vend des services très différents, cherchés par des
          personnes très différentes :
        </p>
        <ul>
          <li>
            <strong>Mariage</strong> : se prépare des mois à l&apos;avance, se
            choisit sur dossier. Cette page montre vos réalisations, votre
            démarche, et propose un rendez-vous.
          </li>
          <li>
            <strong>Deuil</strong> : se cherche dans l&apos;urgence, sur
            téléphone, avec une charge émotionnelle forte. Cette page doit être
            sobre, rassurante, avec la livraison en cérémonie clairement
            expliquée.
          </li>
          <li>
            <strong>Entreprises</strong> : abonnements bureaux, hôtels,
            restaurants — des revenus récurrents qui méritent une page avec
            demande de devis.
          </li>
          <li>
            <strong>Ateliers</strong>, <strong>abonnements particuliers</strong>
            , <strong>événements</strong> : selon votre activité.
          </li>
        </ul>
        <p>
          Chaque page dédiée répond mieux à la personne qui la cherche — et
          c&apos;est aussi l&apos;un des leviers les plus puissants du
          référencement local : Google associe votre boutique à « fleuriste
          mariage + votre ville » seulement si une page en parle sérieusement.
        </p>

        <h2>3. La commande en ligne — au niveau adapté à votre boutique</h2>
        <p>Tous les fleuristes n&apos;ont pas besoin du même niveau :</p>
        <ol>
          <li>
            <strong>Niveau minimal</strong> : un formulaire de commande simple
            (occasion, budget, date de retrait) confirmé par téléphone. Zéro
            gestion de stock, déjà très utile.
          </li>
          <li>
            <strong>Niveau intermédiaire</strong> : un catalogue en gammes —
            « bouquet du marché dès 25 € », « brassée de saison dès 45 € » —
            avec click-and-collect. Vous ne photographiez pas chaque
            composition : vous vendez votre savoir-faire dans une fourchette.
          </li>
          <li>
            <strong>Niveau complet</strong> : catalogue, créneaux de retrait,
            zones de livraison, paiement en ligne. À réserver aux boutiques
            prêtes à intégrer la commande en ligne dans leur routine
            quotidienne.
          </li>
        </ol>
        <p>
          Le bon niveau est celui que vous tiendrez dans la durée. Un catalogue
          en ligne à moitié à jour fait plus de dégâts qu&apos;un formulaire
          simple bien tenu. Notre approche complète est détaillée sur{" "}
          <Link href="/fleuristes/e-commerce">la page e-commerce</Link>.
        </p>

        <h2>4. Des photos à vous — même imparfaites</h2>
        <p>
          Une photo de banque d&apos;images se reconnaît immédiatement, et elle
          dit exactement l&apos;inverse de ce que vous voulez dire. Trois
          photos de vos propres compositions, prises près d&apos;une fenêtre
          sur un fond simple, valent mieux que vingt visuels léchés qui ne vous
          appartiennent pas. Montrez : la devanture (on doit la reconnaître en
          arrivant), l&apos;intérieur, trois à cinq créations récentes, et vous
          ou votre équipe au travail si vous êtes à l&apos;aise.
        </p>

        <h2>5. Les liens avec votre fiche Google</h2>
        <p>
          Votre site et votre fiche Google Business Profile forment un système.
          Vérifiez que le nom, l&apos;adresse, le téléphone et les horaires
          sont <strong>strictement identiques</strong> des deux côtés, que la
          fiche pointe vers votre site (idéalement vers la bonne page service),
          et que le site mentionne clairement votre zone : ville, quartiers
          livrés, communes voisines. Nous avons consacré{" "}
          <Link href="/blog/apparaitre-google-maps-fleuriste">
            un article entier à la visibilité Google Maps
          </Link>
          .
        </p>

        <h2>6. Ce qui doit pouvoir changer sans votre prestataire</h2>
        <p>
          Un site de fleuriste vit au rythme des saisons. Exigez de pouvoir
          modifier vous-même, sans facturation ni délai : horaires et
          fermetures, photos, disponibilités et prix des produits, et une
          annonce ponctuelle (« précommandes de Saint-Valentin ouvertes »). Si
          votre prestataire facture chaque changement d&apos;horaire, le
          problème n&apos;est pas technique — il est contractuel.
        </p>

        <h2>7. Les fondations invisibles</h2>
        <ul>
          <li>
            <strong>Vitesse mobile</strong> : vos clients sont sur téléphone,
            souvent en déplacement. Un site lent perd des commandes.
          </li>
          <li>
            <strong>HTTPS</strong> : indispensable, pour la confiance comme
            pour Google.
          </li>
          <li>
            <strong>Mentions légales et politique de confidentialité</strong> :
            obligatoires, et rassurantes pour les commandes en ligne.
          </li>
          <li>
            <strong>Un nom de domaine à votre nom</strong> : vérifiez que vous
            en êtes propriétaire, pas votre prestataire. C&apos;est votre
            adresse commerciale numérique.
          </li>
        </ul>

        <h2>La checklist récapitulative</h2>
        <ul>
          <li>Horaires, adresse, appel : accessibles en deux gestes</li>
          <li>Une page par service (mariage, deuil, entreprises…)</li>
          <li>Un niveau de commande en ligne tenable dans la durée</li>
          <li>Vos propres photos, récentes</li>
          <li>Site et fiche Google strictement cohérents</li>
          <li>Contenus modifiables par vous, sans frais</li>
          <li>Rapide, sécurisé, légalement en règle, domaine à votre nom</li>
        </ul>
        <p>
          Si vous voulez savoir où en est votre site sur chacun de ces points,{" "}
          <Link href="/audit">notre diagnostic gratuit</Link>{" "}les passe tous en
          revue — honnêtement, et sans engagement.
        </p>
      </>
    ),
  },
  {
    slug: "apparaitre-google-maps-fleuriste",
    title: "Comment apparaître sur Google Maps quand on est fleuriste",
    description:
      "Fiche Google, avis, pages services, cohérence des données : la méthode complète pour améliorer la visibilité locale d'un fleuriste sur Google Maps.",
    datePublished: "2026-07-17",
    dateModified: "2026-07-24",
    readingMinutes: 9,
    authorName: "L'équipe Bloomy Studio",
    body: (
      <>
        <p>
          Tapez « fleuriste » dans Google depuis votre téléphone : trois
          boutiques apparaissent avec une carte, des avis et un itinéraire,
          avant tous les autres résultats. Ce « pack local » capte une part
          décisive des clients — et y figurer n&apos;a rien d&apos;un hasard.
          Voici comment Google choisit, et ce que vous pouvez faire, poste par
          poste.
        </p>

        <h2>Comment Google classe les fleuristes sur Maps</h2>
        <p>Google combine trois familles de critères :</p>
        <ul>
          <li>
            <strong>La pertinence</strong> : votre fiche et votre site
            décrivent-ils précisément ce que la personne cherche ?
          </li>
          <li>
            <strong>La distance</strong> : vous ne contrôlez pas d&apos;où
            cherche le client — raison de plus pour optimiser le reste.
          </li>
          <li>
            <strong>La notoriété</strong> : avis, activité de la fiche,
            cohérence de vos informations sur le web, qualité de votre site.
          </li>
        </ul>
        <p>
          Personne — ni nous, ni personne — ne peut vous « garantir la première
          place ». En revanche, la plupart des fiches de fleuristes sont si peu
          travaillées qu&apos;une optimisation sérieuse change réellement la
          donne dans la majorité des villes.
        </p>

        <h2>Étape 1 — Reprenez la main sur votre fiche</h2>
        <p>
          Si vous ne l&apos;avez jamais fait, cherchez votre boutique sur
          Google et cliquez sur « Vous êtes le propriétaire de cet
          établissement ? ». La vérification prend quelques jours. Une fiche
          non revendiquée, c&apos;est votre vitrine gérée par personne.
        </p>

        <h2>Étape 2 — La catégorie principale, décision la plus importante</h2>
        <p>
          Votre catégorie principale doit être <strong>« Fleuriste »</strong>.
          Pas « Boutique de cadeaux », pas « Magasin ». C&apos;est le premier
          critère de classement local — et l&apos;erreur la plus fréquente.
          Ajoutez ensuite des catégories secondaires si elles correspondent
          vraiment à votre activité (livraison de fleurs, par exemple).
        </p>

        <h2>Étape 3 — Complétez tout, vraiment tout</h2>
        <ul>
          <li>
            <strong>Horaires</strong> : à jour, avec les jours fériés — une
            fiche « horaires non confirmés » fait fuir.
          </li>
          <li>
            <strong>Services</strong> : bouquets sur mesure, mariage, deuil,
            livraison, click-and-collect, abonnements — détaillez.
          </li>
          <li>
            <strong>Photos</strong> : devanture, intérieur, créations récentes.
            Ajoutez-en régulièrement — une fiche vivante rassure Google et vos
            clients. Les photos datées de trois ans racontent une boutique à
            l&apos;abandon.
          </li>
          <li>
            <strong>Description</strong> : votre spécialité, votre quartier,
            votre différence — en langage naturel, sans bourrage de mots-clés.
          </li>
          <li>
            <strong>Zone desservie</strong> : les communes et quartiers que
            vous livrez réellement.
          </li>
        </ul>

        <h2>Étape 4 — Les avis : la régularité compte autant que la note</h2>
        <p>
          Une fiche à 4,8 dont le dernier avis date de huit mois inspire moins
          confiance — aux clients comme à Google — qu&apos;une fiche à 4,6 avec
          des avis chaque semaine. Trois règles :
        </p>
        <ul>
          <li>
            <strong>Demandez simplement</strong> : après une commande réussie,
            un petit mot ou un QR code en boutique suffit. Si vous vendez en
            ligne, un e-mail après livraison fait ce travail automatiquement.
          </li>
          <li>
            <strong>Répondez à tous les avis</strong>, y compris les négatifs —
            avec le calme de quelqu&apos;un dont le prochain client lira la
            réponse.
          </li>
          <li>
            <strong>N&apos;achetez jamais d&apos;avis</strong> et ne filtrez
            jamais les clients mécontents avant de les envoyer vers Google :
            c&apos;est interdit, détectable, et sanctionné.
          </li>
        </ul>

        <h2>Étape 5 — Votre site fait la moitié du travail</h2>
        <p>
          Google lit votre site pour comprendre votre fiche. Trois points de
          jonction :
        </p>
        <ul>
          <li>
            <strong>Cohérence absolue</strong> : nom, adresse, téléphone et
            horaires identiques sur le site, la fiche et les annuaires
            sérieux. Chaque incohérence sème le doute.
          </li>
          <li>
            <strong>Pages services</strong> : « fleuriste mariage + votre
            ville » se gagne avec une vraie page mariage sur votre site — pas
            avec la fiche seule. Nous détaillons ce mécanisme dans{" "}
            <Link href="/blog/site-internet-fleuriste-checklist">
              la checklist du site de fleuriste
            </Link>
            .
          </li>
          <li>
            <strong>Vitesse et mobile</strong> : la fiche envoie vers votre
            site ; si l&apos;atterrissage est lent ou illisible, le client
            repart — et Google le mesure.
          </li>
        </ul>

        <h2>Étape 6 — Publiez au rythme de vos saisons</h2>
        <p>
          Les posts Google (nouveautés, offres) sont un signal d&apos;activité
          simple à entretenir : précommandes de Saint-Valentin, collections de
          fête des mères, horaires de Toussaint, ateliers. Dix minutes par
          semaine suffisent — l&apos;important est la régularité, pas le
          volume.
        </p>

        <h2>Ce qu&apos;il faut en retenir</h2>
        <p>
          La visibilité locale d&apos;un fleuriste se construit avec de la
          rigueur et de la constance : une fiche complète dans la bonne
          catégorie, des avis frais jamais achetés, un site cohérent avec des
          pages services dédiées, et une activité régulière. Rien
          d&apos;ésotérique — mais presque personne ne le fait sérieusement,
          et c&apos;est votre opportunité.
        </p>
        <p>
          Vous voulez savoir où en est votre fiche face aux fleuristes voisins
          ? <Link href="/audit">Le diagnostic gratuit</Link>{" "}inclut cette
          analyse, avec des priorités concrètes. Et si vous préférez déléguer
          la totalité,{" "}
          <Link href="/fleuristes/seo-local">
            notre accompagnement SEO local
          </Link>{" "}
          existe pour ça.
        </p>
      </>
    ),
  },
  {
    slug: "marketplace-ou-site-en-propre",
    title: "Marketplace ou site en propre : le vrai calcul pour un fleuriste",
    description:
      "Commissions, visibilité, fichier client, dépendance : comparaison honnête entre plateformes florales et boutique en ligne en propre, par l'équipe de Bloomy.",
    datePublished: "2026-07-22",
    dateModified: "2026-07-24",
    readingMinutes: 7,
    authorName: "L'équipe Bloomy Studio",
    body: (
      <>
        <p>
          Précision d&apos;honnêteté avant de commencer : nous avons un point de
          vue. Nous avons construit <a href="https://bloomy.one">Bloomy</a>,
          une plateforme florale qui ne prélève aucune commission sur les
          artisans, précisément parce que le modèle dominant nous semblait
          injuste. Et notre studio vend des sites en propre. Cet article
          n&apos;est donc pas neutre — mais il est factuel, et il ne vous dira
          pas de tout quitter du jour au lendemain.
        </p>

        <h2>Ce que les plateformes de transmission vous apportent vraiment</h2>
        <p>Soyons justes, car c&apos;est la condition d&apos;un bon calcul :</p>
        <ul>
          <li>
            <strong>Des commandes sans effort d&apos;acquisition</strong> — la
            plateforme investit en publicité à votre place.
          </li>
          <li>
            <strong>Le réseau de transmission</strong> — une commande passée à
            Lille pour une livraison dans votre ville arrive chez vous.
          </li>
          <li>
            <strong>Une présence immédiate</strong> — utile à
            l&apos;ouverture, quand personne ne vous connaît.
          </li>
        </ul>

        <h2>Ce qu&apos;elles vous coûtent</h2>
        <ul>
          <li>
            <strong>La commission</strong> : un pourcentage significatif de
            chaque commande, parfois cumulé avec un abonnement mensuel et des
            frais d&apos;inscription au réseau. Faites le calcul sur votre
            volume annuel réel — c&apos;est souvent le prix d&apos;un site
            entier, chaque année.
          </li>
          <li>
            <strong>Votre identité</strong> : sur la plateforme, vous exécutez
            un catalogue standardisé sous la marque de quelqu&apos;un
            d&apos;autre. Le « bouquet rond romantique » est le même à
            Strasbourg et à Biarritz — votre savoir-faire devient
            interchangeable.
          </li>
          <li>
            <strong>Le client</strong> : il appartient à la plateforme. Vous ne
            connaissez pas son e-mail, vous ne pouvez pas l&apos;inviter à
            revenir, il n&apos;a souvent même pas retenu votre nom.
          </li>
          <li>
            <strong>La dépendance</strong> : conditions, commissions et
            visibilité dans le réseau peuvent changer sans vous.
          </li>
        </ul>

        <h2>Le calcul à faire, poste par poste</h2>
        <p>Prenez vos chiffres de l&apos;an dernier et posez :</p>
        <ol>
          <li>
            Le volume annuel de commandes venues des plateformes, et la
            commission totale versée (pourcentage + abonnements + frais).
          </li>
          <li>
            La part de ces commandes qui seraient venues à vous de toute façon
            — clients de votre ville qui vous auraient trouvés sur Google Maps
            si votre présence locale était solide.
          </li>
          <li>
            Le coût d&apos;un site en propre avec commande en ligne, amorti
            sur trois ans, entretien compris.
          </li>
        </ol>
        <p>
          Le point 2 est le cœur du sujet : pour beaucoup de boutiques, une
          partie des commandes « apportées » par les plateformes sont des
          clients locaux qui cherchaient simplement un fleuriste dans leur
          ville — et que votre propre visibilité aurait captés sans
          commission. C&apos;est exactement ce que travaillent{" "}
          <Link href="/fleuristes/seo-local">le SEO local</Link>{" "}et{" "}
          <Link href="/fleuristes/e-commerce">la boutique en ligne en propre</Link>.
        </p>

        <h2>Notre recommandation : la transition, pas la rupture</h2>
        <ol>
          <li>
            <strong>Gardez les plateformes qui vous rapportent</strong> tant
            que le calcul reste positif — pas de dogmatisme.
          </li>
          <li>
            <strong>Construisez votre canal en propre</strong> : site solide,
            fiche Google travaillée, commande en ligne à votre niveau.
          </li>
          <li>
            <strong>Faites basculer vos clients locaux</strong> : carte dans
            chaque bouquet livré, mention au comptoir — « la prochaine fois,
            commandez directement sur notre site ». Un client transféré est
            une commission économisée à vie.
          </li>
          <li>
            <strong>Réévaluez chaque année</strong> : quand votre canal propre
            porte l&apos;essentiel de vos commandes locales, la question de
            rester sur telle plateforme se pose sereinement, chiffres en main.
          </li>
        </ol>

        <h2>En résumé</h2>
        <p>
          La question n&apos;est pas « marketplace <em>ou</em> site en propre »
          mais « qui possède quoi ». Sur une plateforme, vous louez un flux de
          commandes au prix fort. Sur votre site, vous possédez
          l&apos;actif — identité, clients, marges — et il prend de la valeur
          chaque année. La transition demande quelques mois d&apos;efforts ;
          la dépendance, elle, se paie indéfiniment.
        </p>
        <p>
          Pour savoir ce qu&apos;un canal en propre pourrait donner dans votre
          ville : <Link href="/audit">le diagnostic gratuit</Link>{" "}évalue votre
          zone, votre concurrence et votre potentiel — honnêtement.
        </p>
      </>
    ),
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
