import { combineReducers } from "redux";
import { carouselReducer } from "../dashboard/(siteweb)/carousel/core/reducers/carousel.reducer";
import { ArticleReducer } from "../dashboard/(siteweb)/article/core/reducers/article.reducer";
import { HomeReducer } from "../dashboard/(siteweb)/home/core/reducers/home.reducer";
import { DioceseReducer } from "../dashboard/(management)/diocese/core/reducers/diocese.reducer";
import { PageDioceseReducer } from "../dashboard/(siteweb)/diocese-page/core/reducers/home.reducer";
import { TonokiraReducer } from "../dashboard/(siteweb)/tonokira/core/reducers/home.reducer";
import { EgliseReducer } from "../dashboard/(management)/eglise/core/reducers/eglise.reducer";
import { PreastReducer } from "../dashboard/(management)/preast/core/reducers/preast.reducer";
import { EtablisementReducer } from "../dashboard/(management)/etablisement/core/reducers/etablisement.reducer";
import { EcoleCathesisteReducer } from "../dashboard/(management)/ecole-cathesiste/core/reducers/ecole-cathesiste.reducer";
import { EleveCathesisteReducer } from "../dashboard/(management)/eleve-cathesiste/core/reducers/eleve-cathesiste.reducer";
import { SanteReducer } from "../dashboard/(management)/sante/core/reducers/sante.reducer";
import { RadioReducer } from "../dashboard/(siteweb)/radio/history/core/reducers/home.reducer";
import { DailyProgramReducer } from "../dashboard/(siteweb)/radio/daily-program/core/reducers/home.reducer";
import { PersonelReducer } from "../dashboard/(siteweb)/radio/personel/core/reducers/personel.reducer";
import { ResponsableReducer } from "../dashboard/(management)/etablisement/core/reducers/responsable.reducer";
import { SanteResponsableReducer } from "../dashboard/(management)/sante/core/reducers/sante_responsable.reducer";
import { TonokiraDailyReducer } from "../dashboard/(siteweb)/daily/core/reducers/home.reducer";
import { HomonorieReducer } from "../dashboard/(management)/association/core/reducers/homonorie.reducer";
import { HomonorieResponsableReducer } from "../dashboard/(management)/association/core/reducers/homonorie_responsable.reducer";
import { LibrairyReducer } from "../dashboard/(management)/librairy/core/reducers/librairy.reducer";
import { LibrairyResponsableReducer } from "../dashboard/(management)/librairy/core/reducers/librairy_responsable.reducer";
import { BookReducer } from "../dashboard/(management)/librairy/core/reducers/book.reducer";
import { FormationReducer } from "../dashboard/(management)/formation/core/reducers/formation.reducer";

export const rootReducers = combineReducers({
  carousel: carouselReducer,
  articles: ArticleReducer,
  home: HomeReducer,
  diocese: DioceseReducer,
  pageDiocese: PageDioceseReducer,
  tonokira: TonokiraReducer,
  eglise: EgliseReducer,
  preast: PreastReducer,
  etablisement: EtablisementReducer,
  ecoleCathesiste: EcoleCathesisteReducer,
  eleveCathesiste: EleveCathesisteReducer,
  sante: SanteReducer,
  radio: RadioReducer,
  dailyProgram: DailyProgramReducer,
  personel: PersonelReducer,
  responsable: ResponsableReducer,
  sante_responsable: SanteResponsableReducer,
  tonokira_daily: TonokiraDailyReducer,
  homonorie: HomonorieReducer,
  homonorie_responsable: HomonorieResponsableReducer,
  librairy: LibrairyReducer,
  librairy_responsable: LibrairyResponsableReducer,
  book: BookReducer,
  formation: FormationReducer,
});
