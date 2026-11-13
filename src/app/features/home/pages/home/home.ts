import { Component } from '@angular/core';
import { Hero } from '../../components/hero/hero';
import { StoneTicker } from '../../components/stone-ticker/stone-ticker';
import { AboutPreview } from '../../components/about-preview/about-preview';
import { StoneGallery } from '../../components/stone-gallery/stone-gallery';
import { FeaturedProducts } from '../../components/featured-products/featured-products';
import { StorageStages } from '../../components/storage-stages/storage-stages';
import { VideoShowcase } from '../../components/video-showcase/video-showcase';
import { WhyChooseUs } from '../../components/why-choose-us/why-choose-us';
import { CtaSection } from '../../../../shared/components/cta-section/cta-section';

@Component({
  imports: [
    Hero,
    StoneTicker,
    AboutPreview,
    StoneGallery,
    StorageStages,
    FeaturedProducts,
    VideoShowcase,
    WhyChooseUs,
    CtaSection,
  ],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {}
