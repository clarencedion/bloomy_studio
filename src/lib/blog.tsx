import type { ReactNode } from "react";
import Link from "next/link";

/**
 * Articles du blog, en dur et typés (pas de CMS au lancement : décision
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
  /** Sujet de l’article, affiché en petit libellé au-dessus du titre. */
  topic: string;
  /**
   * Pages du site qui prolongent l’article (offre ou page métier). Affichées
   * en fin d’article, à côté des autres articles.
   */
  related: { label: string; href: string }[];
  body: ReactNode;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "site-internet-fleuriste-checklist",
    title: "Que doit contenir le site d'un fleuriste : la checklist",
    description:
      "Pages, contenus, fonctions de commande, visibilité locale : la checklist complète d'un site de fleuriste qui travaille, par l'équipe de Bloomy.",
    datePublished: "2026-07-10",
    dateModified: "2026-07-24",
    readingMinutes: 8,
    authorName: "L'équipe Bloomy Studio",
    topic: "Site internet",
    related: [
      { label: "Site internet", href: "/fleuristes/site-internet" },
      { label: "Boutique en ligne", href: "/fleuristes/e-commerce" },
    ],
    body: (
      <>
        <p>
          Nous avons passé deux ans à construire{" "}
          <a href="https://bloomy.one">Bloomy</a>, une plateforme de commande
          florale, aux côtés de fleuristes indépendants. En chemin, nous avons
          vu des dizaines de sites de fleuristes : des bons, des datés, des
          absents. Voici, concrètement, ce qu&apos;un site de fleuriste doit
          contenir pour travailler à votre place pendant que vous composez au
          comptoir.
        </p>

        <h2>Les informations que tout le monde cherche, en premier</h2>
        <p>
          La majorité de vos visiteurs arrivent depuis Google, souvent depuis
          votre fiche Google Business Profile, presque toujours sur téléphone.
          Ils veulent trois choses, dans cet ordre :
        </p>
        <ul>
          <li>
            <strong>Vos horaires du jour</strong>, y compris les jours fériés et
            fermetures exceptionnelles. Un client qui se déplace pour rien ne
            revient pas.
          </li>
          <li>
            <strong>Votre adresse et l&apos;itinéraire</strong>{" "}: un lien direct
            vers Google Maps, pas une carte décorative.
          </li>
          <li>
            <strong>Un moyen de commander ou d&apos;appeler</strong>{" "}: un bouton
            d&apos;appel cliquable, commande en ligne si vous la proposez.
          </li>
        </ul>
        <p>
          Ces trois éléments doivent être accessibles en deux gestes depuis
          n&apos;importe quelle page. Tout le reste du site est secondaire par
          rapport à ça. Un détail technique change tout à ce niveau : le
          numéro de téléphone doit être un <strong>lien cliquable</strong>,
          pas seulement du texte. Sur mobile, la différence est celle entre un
          appel lancé d&apos;un geste et un numéro qu&apos;il faut recopier à
          la main. La plupart des visiteurs pressés abandonnent avant d&apos;y
          arriver.
        </p>

        <h2>Une page par service, pas une page « prestations »</h2>
        <p>
          C&apos;est l&apos;erreur la plus fréquente et la plus coûteuse. Un
          fleuriste vend des services très différents, cherchés par des
          personnes très différentes :
        </p>
        <ul>
          <li>
            <strong>Mariage</strong>{" "}: se prépare des mois à l&apos;avance, se
            choisit sur dossier. Cette page montre vos réalisations, votre
            démarche, et propose un rendez-vous.
          </li>
          <li>
            <strong>Deuil</strong>{" "}: se cherche dans l&apos;urgence, sur
            téléphone, avec une charge émotionnelle forte. Cette page doit être
            sobre, rassurante, avec la livraison en cérémonie clairement
            expliquée.
          </li>
          <li>
            <strong>Entreprises</strong>{" "}: abonnements bureaux, hôtels,
            restaurants. Ce sont des revenus récurrents qui méritent une page avec
            demande de devis.
          </li>
          <li>
            <strong>Ateliers</strong>, <strong>abonnements particuliers</strong>
            , <strong>événements</strong>{" "}: selon votre activité.
          </li>
        </ul>
        <p>
          Chaque page dédiée répond mieux à la personne qui la cherche, et
          c&apos;est aussi l&apos;un des leviers les plus puissants du
          référencement local : Google associe votre boutique à « fleuriste
          mariage + votre ville » seulement si une page en parle sérieusement.
          Une page « prestations » unique qui évoque les quatre activités en
          deux lignes chacune ne convainc ni le visiteur pressé, ni Google :
          elle donne l&apos;impression que rien n&apos;est vraiment
          approfondi.
        </p>

        <h2>La commande en ligne, au niveau adapté à votre boutique</h2>
        <p>Tous les fleuristes n&apos;ont pas besoin du même niveau :</p>
        <ol>
          <li>
            <strong>Niveau minimal</strong>{" "}: un formulaire de commande simple
            (occasion, budget, date de retrait) confirmé par téléphone. Zéro
            gestion de stock, déjà très utile.
          </li>
          <li>
            <strong>Niveau intermédiaire</strong>{" "}: un catalogue en gammes (« bouquet du marché dès 25 € », « brassée de saison dès 45 € ») avec click-and-collect. Vous ne photographiez pas chaque
            composition : vous vendez votre savoir-faire dans une fourchette.
          </li>
          <li>
            <strong>Niveau complet</strong>{" "}: catalogue, créneaux de retrait,
            zones de livraison, paiement en ligne. À réserver aux boutiques
            prêtes à intégrer la commande en ligne dans leur routine
            quotidienne.
          </li>
        </ol>
        <p>
          Le bon niveau est celui que vous tiendrez dans la durée. Un catalogue
          en ligne à moitié à jour fait plus de dégâts qu&apos;un formulaire
          simple bien tenu : un client qui commande une composition indisponible
          et l&apos;apprend au retrait ne revient pas. Beaucoup de boutiques
          commencent au niveau intermédiaire, avec deux ou trois gammes
          seulement, et n&apos;ajoutent la livraison qu&apos;une fois le
          click-and-collect bien rodé. Notre approche complète est détaillée
          sur <Link href="/fleuristes/e-commerce">la page e-commerce</Link>.
        </p>

        <h2>Des photos à vous, même imparfaites</h2>
        <p>
          Une photo de banque d&apos;images se reconnaît immédiatement, et elle
          dit exactement l&apos;inverse de ce que vous voulez dire. Trois
          photos de vos propres compositions, prises près d&apos;une fenêtre
          sur un fond simple, valent mieux que vingt visuels léchés qui ne vous
          appartiennent pas. Montrez : la devanture (on doit la reconnaître en
          arrivant), l&apos;intérieur, trois à cinq créations récentes, et vous
          ou votre équipe au travail si vous êtes à l&apos;aise.
        </p>

        <h2>Les liens avec votre fiche Google</h2>
        <p>
          Votre site et votre fiche Google Business Profile forment un système.
          Vérifiez que le nom, l&apos;adresse, le téléphone et les horaires
          sont <strong>strictement identiques</strong>{" "}des deux côtés, que la
          fiche pointe vers votre site (idéalement vers la bonne page service),
          et que le site mentionne clairement votre zone : ville, quartiers
          livrés, communes voisines. Nous avons consacré{" "}
          <Link href="/blog/apparaitre-google-maps-fleuriste">
            un article entier à la visibilité Google Maps
          </Link>
          .
        </p>

        <h2>Ce qui doit pouvoir changer sans votre prestataire</h2>
        <p>
          Un site de fleuriste vit au rythme des saisons. Exigez de pouvoir
          modifier vous-même, sans facturation ni délai : horaires et
          fermetures, photos, disponibilités et prix des produits, et une
          annonce ponctuelle (« précommandes de Saint-Valentin ouvertes »). Si
          votre prestataire facture chaque changement d&apos;horaire, le
          problème n&apos;est pas technique : il est contractuel. Un test
          simple avant de signer : demandez à changer une horaire ou ajouter
          une fermeture exceptionnelle pendant la démonstration. Si la réponse
          est « on vous envoie un devis », le site ne vous appartient pas
          vraiment, quel que soit ce qui est écrit sur le contrat.
        </p>

        <h2>Les fondations invisibles</h2>
        <ul>
          <li>
            <strong>Vitesse mobile</strong>{" "}: vos clients sont sur téléphone,
            souvent en déplacement. Un site lent perd des commandes.
          </li>
          <li>
            <strong>HTTPS</strong>{" "}: indispensable, pour la confiance comme
            pour Google.
          </li>
          <li>
            <strong>Mentions légales et politique de confidentialité</strong>{" "}:
            obligatoires, et rassurantes pour les commandes en ligne.
          </li>
          <li>
            <strong>Un nom de domaine à votre nom</strong>{" "}: vérifiez que vous
            en êtes propriétaire, pas votre prestataire. C&apos;est votre
            adresse commerciale numérique.
          </li>
        </ul>

        <h2>Ce qui fait fuir un visiteur en quinze secondes</h2>
        <p>
          Certains choix, souvent hérités d&apos;un thème générique, coûtent
          des commandes sans qu&apos;on comprenne pourquoi le téléphone sonne
          moins :
        </p>
        <ul>
          <li>
            <strong>Une musique ou une vidéo en lecture automatique</strong>{" "}:
            le premier réflexe est de quitter l&apos;onglet, pas de couper le
            son.
          </li>
          <li>
            <strong>Une fenêtre d&apos;inscription à la newsletter</strong>{" "}qui
            s&apos;affiche avant même que le visiteur ait vu une seule fleur.
          </li>
          <li>
            <strong>Un menu mobile qui ne se referme pas</strong>, ou des
            boutons trop petits pour un pouce sur un trottoir.
          </li>
          <li>
            <strong>Un formulaire qui n&apos;accuse pas réception</strong>{" "}:
            sans écran ou message de confirmation, la moitié des visiteurs
            renvoient le message deux fois, ou abandonnent en doutant qu&apos;il
            soit parti.
          </li>
          <li>
            <strong>Une page d&apos;accueil muette</strong>{" "}sur ce que vous
            vendez et où vous êtes : le visiteur ne doit jamais avoir à
            faire défiler la page pour comprendre ça.
          </li>
        </ul>

        <h2>L&apos;accessibilité : un minimum légal, un levier commercial</h2>
        <p>
          On la traite souvent comme une case à cocher en fin de projet. C&apos;est
          une erreur : une partie non négligeable de votre clientèle (deuil,
          générations plus âgées, lecture au soleil sur un trottoir) bénéficie
          directement d&apos;un site pensé pour être accessible, sans que cela
          se voie ni ne coûte plus cher à construire dès le départ :
        </p>
        <ul>
          <li>
            <strong>Un contraste suffisant</strong>{" "}entre le texte et le fond,
            y compris en plein soleil sur un écran de téléphone.
          </li>
          <li>
            <strong>Des champs de formulaire correctement étiquetés</strong>,
            pas seulement un texte grisé qui disparaît dès qu&apos;on clique
            dedans.
          </li>
          <li>
            <strong>Un texte alternatif sur les photos</strong>{" "}: utile aux
            technologies d&apos;assistance, et c&apos;est aussi ce que Google
            lit pour comprendre une image.
          </li>
          <li>
            <strong>Une navigation possible au clavier</strong>, pour les
            visiteurs qui ne peuvent pas (ou ne veulent pas) utiliser une
            souris ou un doigt.
          </li>
        </ul>
        <p>
          Rien de tout cela ne se voit sur une maquette. C&apos;est pourtant ce
          qui distingue un site construit sérieusement d&apos;un thème
          assemblé rapidement. C&apos;est aussi, très concrètement, la
          différence entre un client qui parvient à passer commande sans
          effort et un autre qui abandonne au milieu d&apos;un formulaire mal
          conçu.
        </p>

        <h2>Combien de temps ça prend, réalistement</h2>
        <p>
          Construire un site qui coche tous ces points ne se fait pas en un
          après-midi, mais ça ne devrait pas non plus s&apos;étaler sur des
          mois. Chez Bloomy Studio, un site vitrine complet (identité,
          pages services, connexion à la fiche Google, formation) se
          construit en quatre semaines : une semaine de cadrage, une de
          direction visuelle, une de construction, une de lancement. Ce
          rythme n&apos;est pas une règle universelle, mais c&apos;est un
          repère utile face à un devis qui promet deux semaines (souvent un
          thème à peine personnalisé) ou qui s&apos;étire sur six mois sans
          jalon clair. Le détail de ce déroulé est sur{" "}
          <Link href="/fleuristes/site-internet">notre page site internet</Link>.
        </p>

        <h2>La checklist récapitulative</h2>
        <ul>
          <li>Horaires, adresse, appel : accessibles en deux gestes</li>
          <li>Une page par service (mariage, deuil, entreprises…)</li>
          <li>Un niveau de commande en ligne tenable dans la durée</li>
          <li>Vos propres photos, récentes</li>
          <li>Site et fiche Google strictement cohérents</li>
          <li>Contenus modifiables par vous, sans frais</li>
          <li>Rapide, sécurisé, légalement en règle, domaine à votre nom</li>
          <li>Sans piège d&apos;expérience (autoplay, pop-up, menu qui bloque)</li>
          <li>Accessible : contraste, formulaires étiquetés, texte alternatif</li>
        </ul>
        <p>
          Si vous voulez savoir où en est votre site sur chacun de ces points,{" "}
          <Link href="/audit">notre diagnostic gratuit</Link>{" "}les passe tous en
          revue, honnêtement et sans engagement.
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
    readingMinutes: 8,
    authorName: "L'équipe Bloomy Studio",
    topic: "Google Maps",
    related: [
      { label: "SEO local et Google Maps", href: "/fleuristes/seo-local" },
      { label: "Site internet", href: "/fleuristes/site-internet" },
    ],
    body: (
      <>
        <p>
          Tapez « fleuriste » dans Google depuis votre téléphone : trois
          boutiques apparaissent avec une carte, des avis et un itinéraire,
          avant tous les autres résultats. Ce « pack local » capte une part
          décisive des clients, et y figurer n&apos;a rien d&apos;un hasard.
          La bonne nouvelle : contrairement à un classement Google classique,
          souvent verrouillé par des sites installés depuis des années, le
          pack local se rejoue en continu et reste accessible à une petite
          boutique qui fait le travail sérieusement. Voici comment Google
          choisit, et ce que vous pouvez faire, poste par poste.
        </p>

        <h2>Comment Google classe les fleuristes sur Maps</h2>
        <p>Google combine trois familles de critères :</p>
        <ul>
          <li>
            <strong>La pertinence</strong>{" "}: votre fiche et votre site
            décrivent-ils précisément ce que la personne cherche ?
          </li>
          <li>
            <strong>La distance</strong>{" "}: vous ne contrôlez pas d&apos;où
            cherche le client. Raison de plus pour optimiser le reste.
          </li>
          <li>
            <strong>La notoriété</strong>{" "}: avis, activité de la fiche,
            cohérence de vos informations sur le web, qualité de votre site.
          </li>
        </ul>
        <p>
          Personne, ni nous ni un autre prestataire, ne peut vous « garantir la première
          place ». En revanche, la plupart des fiches de fleuristes sont si peu
          travaillées qu&apos;une optimisation sérieuse change réellement la
          donne dans la majorité des villes.
        </p>

        <h2>1. Reprenez la main sur votre fiche</h2>
        <p>
          Si vous ne l&apos;avez jamais fait, cherchez votre boutique sur
          Google et cliquez sur « Vous êtes le propriétaire de cet
          établissement ? ». La vérification prend quelques jours. Une fiche
          non revendiquée, c&apos;est votre vitrine gérée par personne.
        </p>

        <h2>2. La catégorie principale, la décision la plus importante</h2>
        <p>
          Votre catégorie principale doit être <strong>« Fleuriste »</strong>.
          Pas « Boutique de cadeaux », pas « Magasin ». C&apos;est le premier
          critère de classement local, et l&apos;erreur la plus fréquente.
          Ajoutez ensuite des catégories secondaires si elles correspondent
          vraiment à votre activité (livraison de fleurs, par exemple).
        </p>

        <h2>3. Complétez tout, vraiment tout</h2>
        <ul>
          <li>
            <strong>Horaires</strong>{" "}: à jour, avec les jours fériés. Une fiche « horaires non confirmés » fait fuir.
          </li>
          <li>
            <strong>Services</strong>{" "}: bouquets sur mesure, mariage, deuil,
            livraison, click-and-collect, abonnements : détaillez chaque service.
          </li>
          <li>
            <strong>Photos</strong>{" "}: devanture, intérieur, créations récentes.
            Ajoutez-en régulièrement : une fiche vivante rassure Google et vos
            clients. Les photos datées de trois ans racontent une boutique à
            l&apos;abandon.
          </li>
          <li>
            <strong>Description</strong>{" "}: votre spécialité, votre quartier,
            votre différence, en langage naturel et sans bourrage de mots-clés.
          </li>
          <li>
            <strong>Zone desservie</strong>{" "}: les communes et quartiers que
            vous livrez réellement.
          </li>
        </ul>

        <h2>4. Les avis : la régularité compte autant que la note</h2>
        <p>
          Une fiche à 4,8 dont le dernier avis date de huit mois inspire moins
          confiance (aux clients comme à Google) qu&apos;une fiche à 4,6 avec
          des avis chaque semaine. Trois règles :
        </p>
        <ul>
          <li>
            <strong>Demandez simplement</strong>{" "}: après une commande réussie,
            un petit mot ou un QR code en boutique suffit. Si vous vendez en
            ligne, un e-mail après livraison fait ce travail automatiquement.
          </li>
          <li>
            <strong>Répondez à tous les avis</strong>, y compris les négatifs,
            avec le calme de quelqu&apos;un dont le prochain client lira la
            réponse.
          </li>
          <li>
            <strong>N&apos;achetez jamais d&apos;avis</strong>{" "}et ne filtrez
            jamais les clients mécontents avant de les envoyer vers Google :
            c&apos;est interdit, détectable, et sanctionné.
          </li>
        </ul>
        <p>
          Sur un avis négatif, la réponse compte plus que l&apos;avis lui-même
          : reconnaissez le problème sans vous justifier longuement, proposez
          un contact direct (téléphone ou e-mail) pour le régler, et arrêtez-vous
          là. Une réponse courte et posée rassure les futurs clients qui la
          liront ; un échange qui s&apos;envenime publiquement produit
          l&apos;effet inverse, quel que soit qui a raison sur le fond.
        </p>

        <h2>5. Votre site fait la moitié du travail</h2>
        <p>
          Google lit votre site pour comprendre votre fiche. Trois points de
          jonction :
        </p>
        <ul>
          <li>
            <strong>Cohérence absolue</strong>{" "}: nom, adresse, téléphone et
            horaires identiques sur le site, la fiche et les annuaires
            sérieux. Chaque incohérence sème le doute.
          </li>
          <li>
            <strong>Pages services</strong>{" "}: « fleuriste mariage + votre
            ville » se gagne avec une vraie page mariage sur votre site, pas
            avec la fiche seule. Nous détaillons ce mécanisme dans{" "}
            <Link href="/blog/site-internet-fleuriste-checklist">
              la checklist du site de fleuriste
            </Link>
            .
          </li>
          <li>
            <strong>Vitesse et mobile</strong>{" "}: la fiche envoie vers votre
            site ; si l&apos;atterrissage est lent ou illisible, le client
            repart, et Google le mesure.
          </li>
          <li>
            <strong>Les données structurées</strong>{" "}: un balisage technique
            (schema.org) sur votre site décrit explicitement à Google votre
            nom, votre adresse, vos horaires et votre catégorie d&apos;activité. C&apos;est une couche supplémentaire de clarté, en plus du texte visible.
            C&apos;est ce que nous posons systématiquement sur les sites que
            nous livrons.
          </li>
        </ul>

        <h2>6. Plusieurs boutiques, plusieurs fiches</h2>
        <p>
          Si vous avez ouvert une seconde boutique, résistez à la tentation
          d&apos;étendre la zone desservie de votre première fiche plutôt que
          d&apos;en créer une seconde. Chaque adresse physique mérite sa propre
          fiche, avec ses propres horaires, ses propres avis et sa propre
          page service sur votre site si les deux boutiques ne servent pas
          exactement la même clientèle. Une fiche unique qui prétend couvrir
          deux villes brouille la cohérence NAP évoquée plus haut, et Google
          finit presque toujours par le remarquer, au détriment des deux
          adresses plutôt que d&apos;une seule.
        </p>

        <h2>7. Publiez au rythme de vos saisons</h2>
        <p>
          Les posts Google (nouveautés, offres) sont un signal d&apos;activité
          simple à entretenir : précommandes de Saint-Valentin, collections de
          fête des mères, horaires de Toussaint, ateliers. Dix minutes par
          semaine suffisent : l&apos;important est la régularité, pas le
          volume.
        </p>

        <h2>8. Les erreurs qui sabotent un bon classement</h2>
        <p>
          Certaines fiches cumulent des mois d&apos;efforts et stagnent quand
          même, à cause d&apos;un détail qui les dessert en silence :
        </p>
        <ul>
          <li>
            <strong>Une fiche dupliquée</strong>{" "}: deux fiches actives pour la
            même boutique (souvent héritée d&apos;un ancien déménagement ou
            d&apos;un changement de nom) divisent vos avis en deux et
            brouillent Google. Fusionnez ou signalez le doublon dès que vous
            le repérez.
          </li>
          <li>
            <strong>Une catégorie qui change tous les six mois</strong>{" "}:
            Google a besoin de stabilité pour évaluer votre pertinence sur une
            requête. Choisissez « Fleuriste » et n&apos;y touchez plus.
          </li>
          <li>
            <strong>Les questions publiques ignorées</strong>{" "}: la section
            questions-réponses de votre fiche est ouverte à tout le monde, y
            compris à un client qui répond à la place d&apos;un autre avec une
            information fausse. Surveillez-la et répondez vous-même en
            premier.
          </li>
          <li>
            <strong>Une zone desservie trop large</strong>{" "}: indiquer « toute
            la France » pour une boutique avec pignon sur rue dilue votre
            pertinence locale au lieu de la renforcer. Ne listez que les
            communes que vous livrez réellement.
          </li>
        </ul>

        <h2>Combien de temps avant de voir un effet</h2>
        <p>
          Le SEO local n&apos;est pas instantané, et méfiez-vous de quiconque
          promet un classement en quelques jours. Une fiche fraîchement
          complétée et vérifiée montre en général ses premiers effets sur
          quelques semaines ; l&apos;effet cumulé d&apos;avis réguliers, d&apos;une
          activité constante et d&apos;un site cohérent se construit sur
          plusieurs mois. C&apos;est un travail de fond, pas une case à cocher
          une fois pour toutes, d&apos;où l&apos;intérêt d&apos;un rythme
          tenable (dix minutes par semaine) plutôt que d&apos;un sprint suivi
          d&apos;un abandon. Les boutiques qui progressent le plus durablement
          sont rarement celles qui font un grand effort ponctuel, mais celles
          qui tiennent ce rythme modeste sur la durée.
        </p>

        <h2>Le vocabulaire de base, pour s&apos;y retrouver</h2>
        <ul>
          <li>
            <strong>Pack local</strong>{" "}: le bloc de trois résultats avec
            carte qui s&apos;affiche en haut de la recherche Google pour une
            requête locale. C&apos;est l&apos;objectif de cet article.
          </li>
          <li>
            <strong>Fiche d&apos;établissement</strong>{" "}(Google Business
            Profile) : votre profil public sur Google Maps et la recherche, gratuit et distinct de votre site.
          </li>
          <li>
            <strong>Cohérence NAP</strong>{" "}(Nom, Adresse, téléphone) :
            l&apos;abréviation que les professionnels du référencement local
            utilisent pour la cohérence de vos coordonnées sur le web.
          </li>
        </ul>

        <h2>Faut-il aussi faire de la publicité locale ?</h2>
        <p>
          Le pack local dont nous parlons depuis le début est un résultat
          organique : vous n&apos;y figurez pas parce que vous payez, mais
          parce que votre fiche et votre site le méritent. Google propose
          séparément des annonces locales payantes, affichées au-dessus du
          pack organique. Elles peuvent avoir leur intérêt ponctuel (une
          ouverture, un pic saisonnier à sécuriser), mais elles ne
          remplacent pas le travail de fond décrit ici : dès que vous arrêtez
          de payer, la visibilité disparaît avec le budget, alors qu&apos;une
          fiche et un site bien tenus continuent de travailler pour vous
          gratuitement, mois après mois. Pour la plupart des boutiques, mieux
          vaut consolider l&apos;organique d&apos;abord, et ne considérer la
          publicité locale qu&apos;en complément ponctuel, jamais comme un
          raccourci pour éviter le travail de fond décrit dans cet article.
        </p>

        <h2>Ce qu&apos;il faut en retenir</h2>
        <p>
          La visibilité locale d&apos;un fleuriste se construit avec de la
          rigueur et de la constance : une fiche complète dans la bonne
          catégorie, des avis frais jamais achetés, un site cohérent avec des
          pages services dédiées, et une activité régulière. Rien
          d&apos;ésotérique, mais presque personne ne le fait sérieusement,
          et c&apos;est votre opportunité.
        </p>
        <p>
          Vous voulez savoir où en est votre fiche face aux fleuristes voisins
          ? <Link href="/audit">Le diagnostic gratuit</Link>{" "}inclut cette
          analyse, avec des priorités concrètes : dans quel ordre les traiter,
          et ce qui aura le plus d&apos;impact pour votre boutique en
          particulier. Et si vous préférez déléguer la totalité,{" "}
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
    title: "Marketplace ou site en propre : le calcul pour un fleuriste",
    description:
      "Commissions, visibilité, fichier client, dépendance : comparaison honnête entre plateformes florales et boutique en propre, par l'équipe de Bloomy.",
    datePublished: "2026-07-22",
    dateModified: "2026-07-24",
    readingMinutes: 8,
    authorName: "L'équipe Bloomy Studio",
    topic: "Vente en ligne",
    related: [
      { label: "Boutique en ligne", href: "/fleuristes/e-commerce" },
      { label: "SEO local et Google Maps", href: "/fleuristes/seo-local" },
    ],
    body: (
      <>
        <p>
          Précision d&apos;honnêteté avant de commencer : nous avons un point de
          vue. Nous avons construit <a href="https://bloomy.one">Bloomy</a>,
          une plateforme florale qui ne prélève aucune commission sur les
          artisans, précisément parce que le modèle dominant nous semblait
          injuste. Et notre studio vend des sites en propre. Cet article
          n&apos;est donc pas neutre, mais il est factuel, et il ne vous dira
          pas de tout quitter du jour au lendemain. Nous préférons vous donner
          de quoi calculer vous-même plutôt qu&apos;une conclusion toute
          faite : à la fin de cet article, vous devriez pouvoir répondre à la
          question par vous-même, avec vos propres chiffres.
        </p>

        <h2>Ce que les plateformes de transmission vous apportent vraiment</h2>
        <p>Soyons justes, car c&apos;est la condition d&apos;un bon calcul :</p>
        <ul>
          <li>
            <strong>Des commandes sans effort d&apos;acquisition</strong>{" "}: la
            plateforme investit en publicité à votre place.
          </li>
          <li>
            <strong>Le réseau de transmission</strong>{" "}: une commande passée à
            Lille pour une livraison dans votre ville arrive chez vous.
          </li>
          <li>
            <strong>Une présence immédiate</strong>, utile à
            l&apos;ouverture, quand personne ne vous connaît.
          </li>
        </ul>

        <h2>Être sur plusieurs plateformes à la fois : plus de risque, pas moins</h2>
        <p>
          Un réflexe fréquent consiste à s&apos;inscrire sur toutes les
          plateformes disponibles, par précaution, avec l&apos;idée qu&apos;additionner
          les canaux réduit le risque. C&apos;est rarement vrai dans les
          faits : chaque plateforme supplémentaire ajoute sa propre
          commission, son propre catalogue à tenir à jour, et sa propre
          dépendance, sans que le volume de commandes ne suive
          proportionnellement. Le risque ne se dilue pas, il s&apos;additionne. Et le temps passé à gérer trois catalogues standardisés est un
          temps qui ne construit ni votre site, ni votre fiche Google, ni la
          relation directe avec vos clients.
        </p>

        <h2>Ce qu&apos;elles vous coûtent</h2>
        <ul>
          <li>
            <strong>La commission</strong>{" "}: un pourcentage significatif de
            chaque commande, parfois cumulé avec un abonnement mensuel et des
            frais d&apos;inscription au réseau. Faites le calcul sur votre
            volume annuel réel : c&apos;est souvent le prix d&apos;un site
            entier, chaque année.
          </li>
          <li>
            <strong>Votre identité</strong>{" "}: sur la plateforme, vous exécutez
            un catalogue standardisé sous la marque de quelqu&apos;un
            d&apos;autre. Le « bouquet rond romantique » est le même à
            Strasbourg et à Biarritz, et votre savoir-faire devient
            interchangeable.
          </li>
          <li>
            <strong>Le client</strong>{" "}: il appartient à la plateforme. Vous ne
            connaissez pas son e-mail, vous ne pouvez pas l&apos;inviter à
            revenir, il n&apos;a souvent même pas retenu votre nom.
          </li>
          <li>
            <strong>La dépendance</strong>{" "}: conditions, commissions et
            visibilité dans le réseau peuvent changer sans vous, et vous ne
            l&apos;apprenez généralement qu&apos;après coup, par e-mail
            groupé envoyé à tous les artisans du réseau le même jour.
          </li>
        </ul>
        <p>
          Ce dernier point mérite un peu plus qu&apos;une ligne : sur un canal
          en propre, la seule personne qui décide de votre visibilité, de vos
          prix et de votre présentation, c&apos;est vous. Sur une plateforme,
          cette décision appartient à quelqu&apos;un d&apos;autre, qui a ses
          propres intérêts, pas nécessairement alignés avec les vôtres au
          moment où les conditions changent.
        </p>

        <h2>Les questions à poser avant de signer, ou de continuer</h2>
        <p>
          Peu de fleuristes lisent les conditions générales d&apos;une
          plateforme en entier. C&apos;est pourtant là que se cachent les
          vraies contraintes. Avant de signer, ou pour réévaluer un contrat
          en cours, posez ces questions simples :
        </p>
        <ul>
          <li>
            <strong>Le taux de commission peut-il changer</strong>{" "}sans
            préavis, ou seulement à date anniversaire du contrat ?
          </li>
          <li>
            <strong>Récupérez-vous les coordonnées de vos clients</strong>{" "}
            (nom, e-mail, historique de commandes), ou restent-elles
            propriété exclusive de la plateforme ?
          </li>
          <li>
            <strong>Pouvez-vous partir sans pénalité</strong>, et sous quel
            délai de préavis ?
          </li>
          <li>
            <strong>Qui gère la relation client en cas de litige</strong>{" "}(livraison manquée, produit non conforme), et qui en assume le
            coût ?
          </li>
        </ul>
        <p>
          Une plateforme sérieuse répond sans détour à ces quatre questions.
          Des réponses évasives sur la propriété des données clients ou la
          possibilité de partir sont, à elles seules, un signal à prendre au
          sérieux, bien avant que la question de la commission elle-même ne
          se pose.
        </p>

        <h2>Le calcul à faire, poste par poste</h2>
        <p>Prenez vos chiffres de l&apos;an dernier et posez :</p>
        <ol>
          <li>
            Le volume annuel de commandes venues des plateformes, et la
            commission totale versée (pourcentage + abonnements + frais).
          </li>
          <li>
            La part de ces commandes qui seraient venues à vous de toute façon : les clients de votre ville qui vous auraient trouvés sur Google Maps
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
          clients locaux qui cherchaient simplement un fleuriste dans leur ville, et que votre propre visibilité aurait captés sans
          commission. C&apos;est exactement ce que travaillent{" "}
          <Link href="/fleuristes/seo-local">le SEO local</Link>{" "}et{" "}
          <Link href="/fleuristes/e-commerce">la boutique en ligne en propre</Link>.
        </p>

        <h2>Un exemple chiffré, à recalculer avec vos propres nombres</h2>
        <p>
          Pour rendre le calcul concret, prenons des chiffres d&apos;exemple, arrondis et illustratifs, à remplacer par les vôtres avant d&apos;en
          tirer une conclusion. Une boutique qui reçoit 200 commandes par an
          via une ou plusieurs plateformes, à un panier moyen de 45 €, avec
          une commission de 20 % et un abonnement de 30 € par mois :
        </p>
        <ul>
          <li>
            Commission annuelle : 200 × 45 € × 20 % ={" "}
            <strong>1 800 €</strong>.
          </li>
          <li>
            Abonnement annuel : 30 € × 12 = <strong>360 €</strong>.
          </li>
          <li>
            Total versé aux plateformes sur l&apos;année :{" "}
            <strong>environ 2 160 €</strong>.
          </li>
        </ul>
        <p>
          Sur trois ans, sans même tenir compte d&apos;une croissance du
          volume, cela représente l&apos;ordre de grandeur du coût
          d&apos;un site vitrine complet avec commande en ligne, entretien
          compris. La différence : le site reste un actif qui vous
          appartient une fois payé, quand la commission, elle, se répète
          indéfiniment, et augmente si la plateforme change ses conditions.
          Refaites ce calcul avec votre volume réel et votre commission
          exacte : c&apos;est la seule version du calcul qui compte : celle de
          votre boutique, pas une moyenne de marché qui ne correspond
          probablement pas à votre situation.
        </p>

        <h2>Le risque inverse : couper trop tôt</h2>
        <p>
          Le calcul n&apos;est pas toujours en faveur du canal en propre, et
          il serait malhonnête de le cacher. Une boutique qui vient
          d&apos;ouvrir, sans historique d&apos;avis ni visibilité locale
          construite, tire un bénéfice réel d&apos;une plateforme le temps de
          se faire connaître : le flux de commandes, même commissionné,
          finance l&apos;activité pendant que la fiche Google et le site
          montent en puissance. La question n&apos;est donc pas de choisir un
          camp à l&apos;ouverture, mais de savoir à quel moment le rapport de
          force s&apos;inverse, et de ne pas le rater par confort, une fois
          que la plateforme n&apos;apporte plus grand-chose que vous
          n&apos;auriez pas de toute façon.
        </p>

        <h2>Évaluez d&apos;abord votre dépendance actuelle</h2>
        <p>
          Avant de choisir une stratégie, situez-vous. Trois questions
          suffisent à savoir où vous en êtes réellement :
        </p>
        <ul>
          <li>
            Quelle part de votre chiffre d&apos;affaires passe aujourd&apos;hui
            par des plateformes plutôt que par votre boutique ou votre propre
            site ?
          </li>
          <li>
            Si une plateforme doublait sa commission demain, garderiez-vous
            l&apos;essentiel de vos clients, ou perdriez-vous une part du
            volume que vous ne pouvez pas vous permettre de perdre ?
          </li>
          <li>
            Combien de vos clients reviennent vous commander directement,
            hors plateforme, après une première commande passée dessus ?
          </li>
        </ul>
        <p>
          Plus la dépendance est haute et la troisième réponse basse, plus la
          construction d&apos;un canal en propre est urgente : pas dans six
          mois, maintenant. À l&apos;inverse, une dépendance faible et un bon
          taux de retour direct signifient que vous avez déjà, sans le
          nommer ainsi, largement réussi cette transition.
        </p>

        <h2>Notre recommandation : la transition, pas la rupture</h2>
        <ol>
          <li>
            <strong>Gardez les plateformes qui vous rapportent</strong>{" "}tant
            que le calcul reste positif, sans dogmatisme. Une plateforme
            qui apporte une vraie clientèle de passage ou de transmission
            (hors de votre zone locale) reste utile même une fois votre site
            en place.
          </li>
          <li>
            <strong>Construisez votre canal en propre</strong>{" "}: site solide,
            fiche Google travaillée, commande en ligne à votre niveau. C&apos;est
            un investissement qui prend quelques semaines à porter ses
            fruits, pas quelques jours.
          </li>
          <li>
            <strong>Faites basculer vos clients locaux</strong>{" "}: carte dans
            chaque bouquet livré, mention au comptoir (« la prochaine fois,
            commandez directement sur notre site »). Un client transféré est
            une commission économisée à vie.
          </li>
          <li>
            <strong>Réévaluez chaque année</strong>{" "}: quand votre canal propre
            porte l&apos;essentiel de vos commandes locales, la question de
            rester sur telle plateforme se pose sereinement, chiffres en main, et non sous le coup de l&apos;habitude.
          </li>
        </ol>

        <h2>En résumé</h2>
        <p>
          La question n&apos;est pas « marketplace ou site en propre »
          mais « qui possède quoi ». Sur une plateforme, vous louez un flux de
          commandes au prix fort. Sur votre site, vous possédez
          l&apos;actif (identité, clients, marges), et il prend de la valeur
          chaque année. La transition demande quelques mois d&apos;efforts ;
          la dépendance, elle, se paie indéfiniment, et son coût augmente
          silencieusement à chaque révision des conditions du réseau.
        </p>
        <p>
          Pour savoir ce qu&apos;un canal en propre pourrait donner dans votre
          ville : <Link href="/audit">le diagnostic gratuit</Link>{" "}évalue votre
          zone, votre concurrence et votre potentiel, honnêtement. Il inclut
          aussi un regard sur votre dépendance actuelle aux plateformes, et ce
          qu&apos;une transition progressive changerait concrètement à votre
          échelle.
        </p>
      </>
    ),
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
