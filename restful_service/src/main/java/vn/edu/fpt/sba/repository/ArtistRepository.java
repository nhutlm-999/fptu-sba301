package vn.edu.fpt.sba.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.edu.fpt.sba.entity.Artist;

import java.util.List;

@Repository
public interface ArtistRepository extends JpaRepository<Artist, Long> {

    List<Artist> findArtistsByArtistId(Long artistId);
}
