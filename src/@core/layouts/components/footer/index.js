// ** Icons Import
import { Heart } from 'react-feather'

const Footer = () => {
  return (
    <p className='clearfix mb-0'>
      <span className='float-md-start d-block d-md-inline-block mt-25'>
        COPYRIGHT © {new Date().getFullYear()}{' '} Cflex, personnalisé par
        <a href='https://www.linkedin.com/in/claude-kouam%C3%A9-a0ba04174/' target='_blank' rel='noopener noreferrer'>
          {' '} Claude Kouamé
        </a>
        <span className='d-none d-sm-inline-block'>. Tous droits réservés</span>
      </span>
      {/* <span className='float-md-end d-none d-md-block'>
        Hand-crafted & Made with
        <Heart size={14} />
      </span> */}
    </p>
  )
}

export default Footer
