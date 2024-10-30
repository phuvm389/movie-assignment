import React from 'react'
import { ICardsItem } from './Cards.prods';

const CardsItem = ({
  title,
  description,
}: ICardsItem): JSX.Element => {
  return (
    <div>
      <h2>{title}</h2>
      {description && <div dangerouslySetInnerHTML={{ __html: description }} />}
    </div>
  )
}

export default CardsItem;
