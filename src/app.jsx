import { Formik, Form, Field } from "formik";
import './app.css';
import { useState } from 'react';
import './content.css';
import './article.css';

export function App() {
  const [photos, setPhotos] = useState([]);
  const open = url => window.open(url);

  console.log({ photos });
  return (
    <div>
      <header>
        <Formik 
          initialValues={{ search: '' }}
          onSubmit={async values => {
            // Llamando a la API "unplash"
            const response = await fetch(`https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`, 
            {
              headers: {
                'Authorization': 'Client-ID W8NHUMCV5dY3LpB7hXOyTopA4sALRH25cuiKnnwXS_w'
              }
            });

            const data = await response.json();
            setPhotos(data.results); // Actualizar el estado con los nuevos datos
          }}
        >
          <Form>
            <Field  autoComplete="off" name="search" placeholder='Search'/>
          </Form>
        </Formik>
      </header>

      <div className="container">
        <div className="center">
          {photos.map(photo => (
            <article key={photo.id} onClick={() => open(photo.links.html)}>
              <img src={photo.urls.regular} alt={photo.description} />
              <p>{[photo.description, photo.alt_description].join(' - ')}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
