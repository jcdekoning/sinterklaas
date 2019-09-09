import React from 'react';
import useForm from "react-hook-form";

const App = () => {
  const { register, errors, handleSubmit } = useForm();
  const onSubmit = (data: any, e: any) => {
    console.log(data);
    console.log(e);
    alert(JSON.stringify(data));
  };

  return <form onSubmit={handleSubmit(onSubmit)}>
    <h1>Aanmeldingsformulier Sinterklaas 2019</h1>
    <h2>Gegevens volwassene</h2>
    <fieldset>
      <label htmlFor="naam">Uw naam</label>
      <p>Vul a.u.b. uw voornaam en achternaam in.</p>
      <input name="naam" ref={register({
        required: "Vul uw naam in"
      })} />
      {errors.naam && <p className="error">{errors.naam.message}</p>}
    </fieldset>
    <fieldset>
      <label htmlFor="email">Uw emailadres</label>
      <input name="email" ref={register({
        required: "Vul uw emailadres in",
        pattern: {
          value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
          message: "Het formaat van het ingevulde emailadres is ongeldig"
        }
      })} />
      {errors.email && <p className="error">{errors.email.message}</p>}
    </fieldset>
    <fieldset>
      <label htmlFor="aantalvolwassenen">Met hoeveel personen (buiten de kinderen) komt u? </label>
      <p>Per gezin hebben twee personen (boven de 10 jaar) gratis toegang tot het feest. Voor elke extra persoon boven de 10 jaar vragen we 50 NOK  entree.</p>
      <select name="aantalvolwassenen" ref={register}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
    </fieldset>
    <fieldset>
      <legend>Heeft u kinderen op de NTC Het Noorderlicht en/of bent u lid van de Nederlandse Club Oslo?</legend>
      <label><input
        name="relatie"
        type="radio"
        value="School"
        ref={register({ required: true })}
      />Ik heb een kind op de NTC Het Noorderlicht (aanmelding kost 150 Nok per kind)</label>
      <label><input
        name="relatie"
        type="radio"
        value="Club"
        ref={register({ required: true })}
      />Ik ben lid van de Nederlandse Club Oslo (aanmelding kost 150 Nok per kind)</label>
      <label><input
        name="relatie"
        type="radio"
        value="Geen"
        ref={register({ required: true })}
      />Ik heb geen kind op de NTC Het Noorderlicht en ben ook niet lid van de Nederlandse Club Oslo. Ik wil wel graag lid worden van de Nederlandse Club Oslo (aanmelding kost 150 Nok per kind + 175 Nok voor het lidmaatschap tot eind 2019)</label>
      {errors.relatie && <p className="error">Maak een keuze</p>}
    </fieldset>
    <h2>Aanmelding kinderen</h2>
    <fieldset>
      <label htmlFor="aantalkinderen">Met hoeveel kinderen komt u?</label>
      <select name="aantalkinderen" ref={register}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
    </fieldset>
    <h2>Gegevens kind</h2>
    <fieldset>
      <label htmlFor="roepnaamkind">Roepnaam kind</label>
      <input name="roepnaamkind" ref={register({
        required: "Vul de roepnaam van uw kind in"
      })} />
      {errors.roepnaamkind && <p className="error">{errors.roepnaamkind.message}</p>}
    </fieldset>
    <fieldset>
      <label htmlFor="achternaamkind">Achternaam kind</label>
      <input name="achternaamkind" ref={register({
        required: "Vul de achternaam van uw kind in"
      })} />
      {errors.achternaamkind && <p className="error">{errors.achternaamkind.message}</p>}
    </fieldset>
    <fieldset>
      <label htmlFor="leeftijdkind">Leeftijd kind</label>
      <input type="number" name="leeftijdkind" ref={register({
        required: 'Vul de leeftijd van uw kind in',
        min: {
          value: 0,
          message: 'Leeftijd kan niet negatief zijn'
        },
        max: {
          value: 10,
          message: 'De maximale leeftijd is 10 jaar'
        }
      })} />
      {errors.leeftijdkind && <p className="error">{errors.leeftijdkind.message}</p>}
    </fieldset>
    <fieldset>
      <legend>Geslacht kind</legend>
      <label><input
        name="geslachtkind"
        type="radio"
        value="Jongen"
        ref={register({ required: true })}
      />Jongen</label>
      <label><input
        name="geslachtkind"
        type="radio"
        value="Meisje"
        ref={register({ required: true })}
      />Meisje</label>
      {errors.geslachtkind && <p className="error">Kies een geslacht</p>}
    </fieldset>
    <fieldset>
      <label htmlFor="anekdotekind">Anekdote kind</label>
      <textarea name="anekdotekind" rows={3} ref={register} />
      {errors.anekdotekind && <p className="error">Vul een anekdote in</p>}
    </fieldset>
    <h2>Vrijwilligers</h2>
    <p>We hebben uw hulp hard nodig op zaterdag 24 november, want zonder vrijwilligers is het onmogelijk om het Sinterklaasfeest te organiseren. We hopen dat we op uw inzet kunnen rekenen!

Let op! Bij het inplannen van de vrijwilligers wordt rekening gehouden met de audiëntie van uw kind/kinderen aan Sinterklaas. U kunt deze samen met uw kind/kinderen bezoeken. Dit geldt ook voor het ontvangst van Sinterklaas. </p>
    <fieldset>
      <legend>Wilt u zich aanmelden als vrijwilliger?</legend>
      <label><input
        name="vrijwilliger"
        type="radio"
        value="uur"
        ref={register({ required: true })}
      />Ja, voor 1 uur</label>
      <label><input
        name="vrijwilliger"
        type="radio"
        value="dagdeel"
        ref={register({ required: true })}
      />Ja, voor een dagdeel (ochtend- of middagsessie)</label>
      <label><input
        name="vrijwilliger"
        type="radio"
        value="dagdeelzonderkind"
        ref={register({ required: true })}
      />Ja, voor een dagdeel waar mijn kind/kinderen NIET bij aanwezig is/zijn</label>
      <label><input
        name="vrijwilliger"
        type="radio"
        value="dag"
        ref={register({ required: true })}
      />Ja, voor de gehele dag</label>
      <label><input
        name="vrijwilliger"
        type="radio"
        value="nee"
        ref={register({ required: true })}
      />Nee</label>
      {errors.vrijwilliger && <p className="error">Maak een keuze</p>}
    </fieldset>
    <fieldset>
      <label htmlFor="commentaar">Heeft u nog overige vragen en/of opmerkingen?</label>
      <textarea name="commentaar" rows={3} ref={register} />
      {errors.commentaar && <p className="error">{errors.commentaar.message}</p>}
    </fieldset>
    <fieldset>
      <legend>Privacyverklaring</legend>
      <p>
        Bij aanmelding worden uw persoonsgegevens en de gegevens van uw kind/kinderen bewaard door de Nederlandse Club Oslo. Op https://nederlandsecluboslo.nl/privacy kunt uw lezen waarom dit noodzakelijk is en hoe wij met deze gegevens omgaan.
      </p>
      <label><input
        name="privacyverklaring"
        type="checkbox"
        value="akkoord"
        ref={register({ required: true })}
      />Ik heb de privacyverklaring gelezen</label>
      {errors.privacyverklaring && <p className="error">Accepteer de privacyverklaring</p>}
    </fieldset>
    <input type="submit" value="Naar betaling" />
  </form>
}

export default App;
