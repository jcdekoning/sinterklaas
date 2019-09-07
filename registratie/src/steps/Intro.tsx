import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Intro.module.css';

import { ReactComponent as SinterklaasSvg } from '../images/sinterklaas.svg';
import { ReactComponent as PaardSvg } from '../images/paard.svg';
import { ReactComponent as BoekSvg } from '../images/boek.svg';
import { ReactComponent as KlompSvg } from '../images/klomp.svg';
import { ReactComponent as CadeauSvg } from '../images/cadeau.svg';

const Intro = () => {
  return <>
    <article className={styles.step}>
      <header>
        <div className={styles.content}>
          <h1>Inschrijving Sinterklaas</h1>
          <div>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Fusce ullamcorper dapibus nisl. In id dui. Nunc pulvinar erat et nibh. Integer sollicitudin. Quisque faucibus. Sed eleifend sapien sed nunc. Pellentesque congue leo et felis eleifend scelerisque. In a mauris ultricies diam tincidunt pharetra. Etiam venenatis facilisis orci. Donec quam dui, mattis eu, posuere a, tristique ut, pede. Sed quis nibh. Praesent augue metus, dapibus ac, consectetuer a, convallis eu, elit. Etiam et dui.
          </div>
        </div>
      </header>
      <section>
        <div className={styles.content}>
          <h2>Hoe werkt het inschrijven?</h2>
          <ul className={styles.steps}>
            <li>
              <div>
                <SinterklaasSvg />
              </div>
              <div>
                <h3>Algemene gegevens</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eget leo justo. Praesent finibus pulvinar diam id sagittis. Praesent ac massa maximus, scelerisque velit nec, cursus massa. </p>
              </div>
            </li>
            <li>
              <div>
                <BoekSvg />
              </div>
              <div>
                <h3>Gegevens kinderen</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eget leo justo. Praesent finibus pulvinar diam id sagittis. Praesent ac massa maximus, scelerisque velit nec, cursus massa. </p>
              </div>
            </li>
            <li>
              <div>
                <PaardSvg />
              </div>
              <div>
                <h3>Opgeven als vrijwilliger</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eget leo justo. Praesent finibus pulvinar diam id sagittis. Praesent ac massa maximus, scelerisque velit nec, cursus massa. </p>
              </div>
            </li>
            <li>
              <div>
                <KlompSvg />
              </div>
              <div>
                <h3>Inschrijving controleren</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eget leo justo. Praesent finibus pulvinar diam id sagittis. Praesent ac massa maximus, scelerisque velit nec, cursus massa. </p>
              </div>
            </li>
            <li>
              <div>
                <CadeauSvg />
              </div>
              <div>
                <h3>Betalen</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eget leo justo. Praesent finibus pulvinar diam id sagittis. Praesent ac massa maximus, scelerisque velit nec, cursus massa. </p>
              </div>
            </li>
          </ul>
        </div>
      </section>
      <footer>
        <div className={styles.content}>
          <Link
            to="/stap1">Begin aanmelding</Link>
        </div>
      </footer>
    </article>
  </>
}

export default Intro;