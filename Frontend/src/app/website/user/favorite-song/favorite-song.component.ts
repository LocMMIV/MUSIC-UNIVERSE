import { Component } from '@angular/core';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-favorite-song',
  templateUrl: './favorite-song.component.html',
  styleUrl: './favorite-song.component.css'
})
export class FavoriteSongComponent {
  favoriteSongs = [
    { image: '../../../../assets/images/moloichoem.jpg', songName: 'Mở Lối Cho Em', artist: 'Lương Huy Tuấn, Hữu Công', genre: 'V-pop',
      isLiked: true, audioUrl: '../../../../assets/audio/moloichoem.mp3', duration: '05:19' },
    { image: '../../../../assets/images/noinhovohan.jpg',songName: 'Nỗi Nhớ Vô Hạn', artist: 'Thanh Hưng', genre: 'V-pop',
      isLiked: true, audioUrl: '../../../../assets/audio/noinhovohan.mp3' },
    { image: '../../../../assets/images/moloichoem2.jpg',songName: 'Mở Lối Cho Em 2', artist: 'Lương Huy Tuấn, An Clock', genre: 'V-pop',
      isLiked: true, audioUrl: '../../../../assets/audio/moloichoem2.mp3' },
    { image: '../../../../assets/images/vansutuyduyen.jpg',songName: 'Vạn Sự Tùy Duyên', artist: 'Thanh Hưng', genre: 'V-pop',
      isLiked: true, audioUrl: '../../../../assets/audio/vansutuyduyen.mp3' },
    { image: '../../../../assets/images/duoitancaykhohoano.jpg',songName: 'Dưới Tán Cây Khô Hoa Nở', artist: 'J97', genre: 'V-pop',
      isLiked: true, audioUrl: '../../../../assets/audio/duoitancaykhohoano.mp3' },
    { image: '../../../../assets/images/suotdoikhongxung.jpg',songName: 'Suốt Đời Không Xứng', artist: 'Khải Đăng, Vương Anh Tú, Ribi Sachi', genre: 'V-pop',
      isLiked: true, audioUrl: '../../../../assets/audio/suotdoikhongxung.mp3' },
    { image: '../../../../assets/images/chanhlongthuongco4.jpg',songName: 'Chạnh Lòng Thương Cô 4', artist: 'Huy Vạc', genre: 'V-pop',
      isLiked: true, audioUrl: '../../../../assets/audio/chanhlongthuongco4.mp3' },
    { image: '../../../../assets/images/chieuthuhoabongnang.jpg',songName: 'Chiều Thu Họa Bóng Nàng', artist: 'Đatkka', genre: 'V-pop',
    isLiked: true, audioUrl: '../../../../assets/audio/chieuthuhoabongnang.mp3' },
    { image: '../../../../assets/images/tralaithanhxuanchoem.jpg',songName: 'Trả Lại Thanh Xuân Cho Em', artist: 'H2K', genre: 'V-pop',
      isLiked: true, audioUrl: '../../../../assets/audio/tralaithanhxuanchoem.mp3' },
    ];
  
    likedSongs: any[] = [];
  
    constructor(private notificationService: NotificationService) { }
  
    toggleLike(index: number) {
      const favoriteSong = this.favoriteSongs[index];
    
      if (favoriteSong.isLiked) {
        // Bài hát đã được yêu thích, bỏ thích
        this.likedSongs = this.likedSongs.filter((likedSong) => likedSong !== favoriteSong);
        this.notificationService.showMessage(`${favoriteSong.songName} đã xóa khỏi danh sách yêu thích`, 'success');
      } else {
        // Bài hát chưa được yêu thích, thêm vào danh sách yêu thích
        this.likedSongs.push(favoriteSong);
        this.notificationService.showMessage(`${favoriteSong.songName} đã thêm vào danh sách yêu thích`, 'success');
      }
    
      // Thay đổi trạng thái yêu thích của bài hát sau khi thông báo
      favoriteSong.isLiked = !favoriteSong.isLiked;
    }
}
